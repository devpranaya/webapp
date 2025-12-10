import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Serverless Function: Game Statistics API
 * Deployed on Vercel - runs on-demand without a server
 * 
 * GET /api/stats
 * Returns aggregated statistics about all game sessions
 */
export async function GET() {
  try {
    // Aggregate statistics from database
    const [totalGames, wonGames, lostGames, inProgressGames] = await Promise.all([
      prisma.gameSession.count(),
      prisma.gameSession.count({ where: { status: 'won' } }),
      prisma.gameSession.count({ where: { status: 'lost' } }),
      prisma.gameSession.count({ where: { status: 'in_progress' } }),
    ]);

    // Calculate win rate
    const completedGames = wonGames + lostGames;
    const winRate = completedGames > 0 
      ? ((wonGames / completedGames) * 100).toFixed(2) 
      : 0;

    // Get average time for completed games
    const completedSessions = await prisma.gameSession.findMany({
      where: {
        status: { in: ['won', 'lost'] },
        timeElapsed: { not: null }
      },
      select: { timeElapsed: true }
    });

    const avgTime = completedSessions.length > 0
      ? Math.round(
          completedSessions.reduce((sum, s) => sum + (s.timeElapsed || 0), 0) / 
          completedSessions.length
        )
      : 0;

    // Get recent feedback count
    const feedbackCount = await prisma.feedback.count();

    const stats = {
      totalGames,
      wonGames,
      lostGames,
      inProgressGames,
      completedGames,
      winRate: `${winRate}%`,
      averageTimeSeconds: avgTime,
      feedbackCount,
      timestamp: new Date().toISOString(),
      serverless: true, // Indicates this is a serverless function
    };

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching game statistics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch statistics',
        message: error instanceof Error ? error.message : 'Unknown error',
        serverless: true,
      },
      { status: 500 }
    );
  }
}
