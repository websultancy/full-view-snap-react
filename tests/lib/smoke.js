const { By, until } = require('selenium-webdriver');

const { DEMO_URL } = require('../config/lambdatest');

const CURRENT_VIEW_VALUE_XPATH =
  "//div[contains(@class,'full-view-stat-title') and normalize-space()='currentView']/following-sibling::div[contains(@class,'full-view-stat-value')][1]";

const WHEEL_DELTA_PER_TICK = 400;
const SNAP_SETTLE_MS = 400;
const VIEW_CHANGE_TIMEOUT_MS = 15_000;

/**
 * @param {import('selenium-webdriver').WebDriver} driver
 */
async function getCurrentView(driver) {
  const el = await driver.findElement(By.xpath(CURRENT_VIEW_VALUE_XPATH));
  const text = (await el.getText()).trim();
  if (!/^\d+$/.test(text)) {
    throw new Error(`Expected numeric currentView, got "${text}"`);
  }
  return parseInt(text, 10);
}

/**
 * W3C wheel action — vertical delta on the viewport (WebDriver wheel input).
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {number} deltaY Positive = down, negative = up
 */
async function wheelScrollVertical(driver, deltaY) {
  await driver
    .actions({ bridge: true })
    .scroll(0, 0, 0, deltaY)
    .perform();
}

/**
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {number} targetView
 */
async function wheelUntilCurrentView(driver, targetView) {
  const deadline = Date.now() + VIEW_CHANGE_TIMEOUT_MS;

  while (Date.now() < deadline) {
    const current = await getCurrentView(driver);
    if (current === targetView) return;

    const deltaY =
      current < targetView ? WHEEL_DELTA_PER_TICK : -WHEEL_DELTA_PER_TICK;
    await wheelScrollVertical(driver, deltaY);
    await driver.sleep(SNAP_SETTLE_MS);
  }

  const final = await getCurrentView(driver);
  throw new Error(
    `Timed out waiting for currentView ${targetView} (still ${final})`,
  );
}

/**
 * Smoke test for the Vite "basic" demo: load, wheel-scroll, snap index updates.
 * @param {import('selenium-webdriver').WebDriver} driver
 */
async function runSmokeTest(driver) {
  await driver.get(DEMO_URL);

  const stats = await driver.wait(
    until.elementLocated(By.css('.full-view-stats')),
    30_000,
  );
  await driver.wait(until.elementIsVisible(stats), 10_000);

  const initialView = await getCurrentView(driver);
  if (initialView !== 0) {
    throw new Error(`Expected initial currentView 0, got ${initialView}`);
  }

  // Wheel down: snap through views 1 and 2
  await wheelUntilCurrentView(driver, 1);
  await wheelUntilCurrentView(driver, 2);

  // Wheel up: back toward the top
  await wheelUntilCurrentView(driver, 1);
  await wheelUntilCurrentView(driver, 0);
}

module.exports = { runSmokeTest, getCurrentView, wheelScrollVertical };
