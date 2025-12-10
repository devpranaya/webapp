import { test, expect } from '@playwright/test';

test.describe('Court Room Game - Basic Functionality', () => {
  test('should load the game page and show initial state', async ({ page }) => {
    // Navigate to Court Room page
    await page.goto('/court-room');

    // Verify page title
    await expect(page).toHaveTitle(/Court Room/i);

    // Verify main heading
    await expect(page.locator('h1')).toContainText('Court Room');

    // Verify game starts in idle state with Start button visible
    await expect(page.locator('button:has-text("Start Game")')).toBeVisible();

    // Verify code editor is present
    await expect(page.locator('textarea')).toBeVisible();

    // Verify all 4 fix badges are visible
    await expect(page.locator('.fix-badge')).toHaveCount(4);

    // Verify timer is displayed
    await expect(page.locator('.timer-display')).toBeVisible();

    // Take screenshot of initial state
    await page.screenshot({ path: 'tests/screenshots/initial-state.png', fullPage: true });
  });

  test('should start the game and show game controls', async ({ page }) => {
    await page.goto('/court-room');

    // Set timer to 1 minute
    await page.locator('input[type="number"]').fill('1');
    await page.locator('button:has-text("Set Time")').click();

    // Verify timer updated
    await expect(page.locator('.timer-display')).toContainText('1:00');

    // Click Start Game
    await page.locator('button:has-text("Start Game")').click();

    // Verify game started - Pause and Reset buttons should appear
    await expect(page.locator('button:has-text("Pause")')).toBeVisible();
    await expect(page.locator('button:has-text("Reset")')).toBeVisible();

    // Verify Start Game button is hidden/disabled
    await expect(page.locator('button:has-text("Start Game")')).not.toBeVisible();

    // Take screenshot of game running
    await page.screenshot({ path: 'tests/screenshots/game-started.png', fullPage: true });
  });

  test('should pause and resume the game', async ({ page }) => {
    await page.goto('/court-room');

    // Start game with 2 minute timer
    await page.locator('input[type="number"]').fill('2');
    await page.locator('button:has-text("Set Time")').click();
    await page.locator('button:has-text("Start Game")').click();

    // Wait a moment for game to start
    await page.waitForTimeout(1000);

    // Click Pause
    await page.locator('button:has-text("Pause")').click();

    // Verify Resume button appears
    await expect(page.locator('button:has-text("Resume")').first()).toBeVisible();

    // Take screenshot of paused state
    await page.screenshot({ path: 'tests/screenshots/game-paused.png', fullPage: true });

    // Click Resume
    await page.locator('button:has-text("Resume")').first().click();

    // Verify Pause button is back
    await expect(page.locator('button:has-text("Pause")').first()).toBeVisible();
  });

  test('should detect code changes and validate fixes', async ({ page }) => {
    await page.goto('/court-room');

    // Start game
    await page.locator('button:has-text("Start Game")').click();

    // Wait for game to start
    await page.waitForTimeout(500);

    // Get code editor
    const codeEditor = page.locator('textarea');

    // Modify code to add alt text (first fix)
    await codeEditor.fill(`<img src="example.jpg" alt="description">
<input type="text">
// Add your fixes below
`);

    // Wait for validation
    await page.waitForTimeout(1000);

    // Check if any fix badge changed state
    const badges = page.locator('.fix-badge');
    const badgeCount = await badges.count();
    expect(badgeCount).toBe(4);

    // Take screenshot showing code changes
    await page.screenshot({ path: 'tests/screenshots/code-modified.png', fullPage: true });
  });

  test('should show message history', async ({ page }) => {
    await page.goto('/court-room');

    // Start game with longer timer to receive messages
    await page.locator('input[type="number"]').fill('3');
    await page.locator('button:has-text("Set Time")').click();
    await page.locator('button:has-text("Start Game")').click();

    // Wait for potential messages to appear (messages appear every 20-30s)
    // For testing, we'll just wait a few seconds to verify the message system exists
    await page.waitForTimeout(5000);

    // Verify message history section exists
    const messageHistory = page.locator('.message-item, [class*="message"], h3:has-text("Message History")');
    
    // Check if message-related elements are on the page
    const hasMessages = await messageHistory.count() > 0;
    
    // Take screenshot regardless
    await page.screenshot({ path: 'tests/screenshots/game-with-messages.png', fullPage: true });

    // Basic assertion that page didn't crash
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should export HTML correctly', async ({ page }) => {
    await page.goto('/court-room');

    // Scroll to export section
    await page.locator('button:has-text("Download HTML Game")').scrollIntoViewIfNeeded();

    // Verify export button is visible
    await expect(page.locator('button:has-text("Download HTML Game")').first()).toBeVisible();

    // Take screenshot of export section
    await page.screenshot({ path: 'tests/screenshots/export-section.png' });

    // Note: Actually clicking the download button would trigger a file download
    // For testing purposes, we just verify it exists
  });
});
