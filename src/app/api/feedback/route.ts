import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/feedback - List all feedback
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const source = searchParams.get('source');

    const where = source ? { source } : {};

    const [feedback, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.feedback.count({ where }),
    ]);

    return NextResponse.json({
      feedback,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}

// POST /api/feedback - Create new feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, source, rating, comments, suggestions } = body;

    // Validate required fields
    if (!source || !rating) {
      return NextResponse.json(
        { error: 'Source and rating are required' },
        { status: 400 }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        sessionId: sessionId || null,
        source,
        rating,
        comments: comments || null,
        suggestions: suggestions || null,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json(
      { error: 'Failed to create feedback' },
      { status: 500 }
    );
  }
}
