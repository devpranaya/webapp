-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "status" TEXT NOT NULL,
    "timeElapsed" INTEGER,
    "fixesCompleted" TEXT NOT NULL DEFAULT '',
    "violations" TEXT NOT NULL DEFAULT '',
    "playerName" TEXT
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" TEXT,
    "source" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comments" TEXT,
    "suggestions" TEXT
);

-- CreateIndex
CREATE INDEX "GameSession_createdAt_idx" ON "GameSession"("createdAt");

-- CreateIndex
CREATE INDEX "Feedback_createdAt_source_idx" ON "Feedback"("createdAt", "source");
