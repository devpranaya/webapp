import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/games/:id - Get specific game session
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await prisma.gameSession.findUnique({
      where: { id: params.id },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Game session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...session,
      fixesCompleted: session.fixesCompleted ? JSON.parse(session.fixesCompleted) : [],
      violations: session.violations ? JSON.parse(session.violations) : [],
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game session' },
      { status: 500 }
    );
  }
}

// PUT /api/games/:id - Update game session
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, timeElapsed, fixesCompleted, violations } = body;

    const updateData: any = {};
    
    if (status) {
      updateData.status = status;
      if (status === 'won' || status === 'lost') {
        updateData.completedAt = new Date();
      }
    }
    
    if (timeElapsed !== undefined) updateData.timeElapsed = timeElapsed;
    if (fixesCompleted) updateData.fixesCompleted = JSON.stringify(fixesCompleted);
    if (violations) updateData.violations = JSON.stringify(violations);

    const session = await prisma.gameSession.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({
      ...session,
      fixesCompleted: session.fixesCompleted ? JSON.parse(session.fixesCompleted) : [],
      violations: session.violations ? JSON.parse(session.violations) : [],
    });
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: 'Failed to update game session' },
      { status: 500 }
    );
  }
}

// DELETE /api/games/:id - Delete game session
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.gameSession.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Game session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json(
      { error: 'Failed to delete game session' },
      { status: 500 }
    );
  }
}
