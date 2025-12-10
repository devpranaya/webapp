import { test, expect } from '@playwright/test';

test.describe('Court Room Game - Win Scenario', () => {
  test('should successfully complete all fixes and win the game', async ({ page }) => {
    // Navigate to Court Room page
    await page.goto('/court-room');

    // Wait for page to load
    await expect(page.locator('h1')).toContainText('Court Room');

    // Verify initial state is "idle"
    await expect(page.locator('text=Start Game')).toBeVisible();

    // Set custom time to 1 minute for faster testing
    await page.locator('input[type="number"]').fill('1');
    await page.locator('button:has-text("Set Time")').click();

    // Start the game
    await page.locator('button:has-text("Start Game")').click();

    // Wait for game to start
    await expect(page.locator('button:has-text("Pause")')).toBeVisible();

    // Get the code editor
    const codeEditor = page.locator('textarea');

    // Complete all 4 critical fixes
    
    // 1. Fix Alt Text
    await codeEditor.fill(`<img src="example.jpg" alt="example image">
<input type="text">
// Add your fixes below
`);
    await page.waitForTimeout(500);

    // Verify alt-text fix is completed
    await expect(page.locator('.fix-badge:has-text("Alt Text")').locator('.completed, text=/✓|✔/').first()).toBeVisible({ timeout: 2000 });

    // 2. Add Input Validation
    await codeEditor.fill(`<img src="example.jpg" alt="example image">
<input type="text" validation required>
// Add your fixes below
`);
    await page.waitForTimeout(500);

    // 3. Fix User Login (add login keyword)
    await codeEditor.fill(`<img src="example.jpg" alt="example image">
<input type="text" validation required>
// User login authentication
function login() { }
`);
    await page.waitForTimeout(500);

    // 4. Secure Database (add encryption/secure keyword)
    await codeEditor.fill(`<img src="example.jpg" alt="example image">
<input type="text" validation required>
// User login authentication
function login() { }
// Database with encryption and secure connection
`);
    await page.waitForTimeout(500);

    // Wait to see if victory banner appears (within the time limit)
    // The game should show a victory banner when all fixes are complete
    const victoryBanner = page.locator('.victory-banner, text=/You Win|Victory|Congratulations/i');
    await expect(victoryBanner).toBeVisible({ timeout: 65000 }); // Wait up to 65 seconds

    // Verify all fixes are marked as completed
    await expect(page.locator('.fix-badge.completed')).toHaveCount(4);

    // Take screenshot of victory
    await page.screenshot({ path: 'tests/screenshots/win-scenario.png' });
  });
});
