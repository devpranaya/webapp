import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/games - List all game sessions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status');

    const where = status ? { status } : {};

    const [sessions, total] = await Promise.all([
      prisma.gameSession.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.gameSession.count({ where }),
    ]);

    // Parse JSON strings back to arrays
    const sessionsWithParsedData = sessions.map((session) => ({
      ...session,
      fixesCompleted: session.fixesCompleted ? JSON.parse(session.fixesCompleted) : [],
      violations: session.violations ? JSON.parse(session.violations) : [],
    }));

    return NextResponse.json({
      sessions: sessionsWithParsedData,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game sessions' },
      { status: 500 }
    );
  }
}

// POST /api/games - Create new game session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playerName } = body;

    const session = await prisma.gameSession.create({
      data: {
        status: 'in_progress',
        playerName: playerName || null,
        fixesCompleted: '[]',
        violations: '[]',
      },
    });

    return NextResponse.json({
      ...session,
      fixesCompleted: [],
      violations: [],
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create game session' },
      { status: 500 }
    );
  }
}
