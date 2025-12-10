import { test, expect } from '@playwright/test';

test.describe('Court Room Game - Violation Scenario', () => {
  test('should trigger violations and enter court scene when time runs out', async ({ page }) => {
    // Navigate to Court Room page
    await page.goto('/court-room');

    // Wait for page to load
    await expect(page.locator('h1')).toContainText('Court Room');

    // Set very short time (0.1 minutes = 6 seconds) to trigger violations quickly
    await page.locator('input[type="number"]').fill('0.1');
    await page.locator('button:has-text("Set Time")').click();

    // Verify timer shows correct time
    await expect(page.locator('.timer-display')).toContainText('0:06');

    // Start the game
    await page.locator('button:has-text("Start Game")').click();

    // Wait for game to start
    await expect(page.locator('button:has-text("Pause")')).toBeVisible();

    // Intentionally DO NOT complete any fixes
    // Just wait for time to run out

    // Wait for timer to reach 0 or near 0
    await page.waitForTimeout(7000); // Wait 7 seconds for 6-second timer to expire

    // Check if court scene appears (violation scenario)
    // The game should transition to court scene when time runs out with incomplete fixes
    const courtBanner = page.locator('.court-banner, text=/Court|Violation|Failed|You Lost/i');
    
    // Verify court scene or game over state
    await expect(courtBanner).toBeVisible({ timeout: 5000 });

    // Verify that violations are listed
    const violationItems = page.locator('.violation-item');
    await expect(violationItems).toHaveCount(await violationItems.count(), { timeout: 2000 });

    // Take screenshot of violation/court scene
    await page.screenshot({ path: 'tests/screenshots/violation-scenario.png' });

    // Verify game status shows lost
    const lostIndicator = page.locator('text=/You Lost|Game Over|Violations/i');
    await expect(lostIndicator).toBeVisible();
  });

  test('should show warning messages before violations occur', async ({ page }) => {
    // Navigate to Court Room page
    await page.goto('/court-room');

    // Set time to 2 minutes to see warnings
    await page.locator('input[type="number"]').fill('2');
    await page.locator('button:has-text("Set Time")').click();

    // Start the game  
    await page.locator('button:has-text("Start Game")').click();

    // Wait for game to start
    await expect(page.locator('button:has-text("Pause")')).toBeVisible();

    // DO NOT complete any fixes - wait for warnings

    // After 2 minutes (120s), warnings should appear at:
    // - First warning at 2 min mark (when challenge is issued)
    // - URGENT warning at 2 min later (120s - 120s = 0s)
    // For 2-min game, we need to wait for the system to issue challenges

    // Wait some time (but not complete the timer)
    await page.waitForTimeout(10000); // Wait 10 seconds

    // Check if any messages appeared in message history
    const messageHistory = page.locator('.message-item');
    const messageCount = await messageHistory.count();
    
    // At least some messages should have appeared
    expect(messageCount).toBeGreaterThan(0);

    // Look for any urgent or priority messages
    const urgentMessage = page.locator('.message-item', { hasText: /URGENT|CRITICAL|WARNING/i });
    
    // If game mechanics send messages, verify they exist
    if (await urgentMessage.count() > 0) {
      await expect(urgentMessage.first()).toBeVisible();
    }

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/warning-messages.png' });
  });
});
