const { By, until } = require('selenium-webdriver');

const { DEMO_URL } = require('../config/lambdatest');

const CURRENT_VIEW_VALUE_XPATH =
  "//div[contains(@class,'full-view-stat-title') and normalize-space()='currentView']/following-sibling::div[contains(@class,'full-view-stat-value')][1]";

/** Per wheel event — close to typical browser wheel deltaY (~100–120). */
const WHEEL_TICK_DELTA = 120;
/** Rapid ticks per gesture, chained in one W3C perform(). */
const WHEEL_TICKS_PER_GESTURE = 24;
/** Pause between ticks inside a gesture (ms). ~16 ≈ one frame. */
const WHEEL_TICK_PAUSE_MS = 6;
/** Brief pause after a gesture before re-checking currentView. */
const GESTURE_SETTLE_MS = 200;
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
 * One continuous wheel gesture: many small deltaY ticks in quick succession.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {1 | -1} direction Positive = down, negative = up
 */
async function wheelGestureBurst(driver, direction) {
  const tickDelta = direction * WHEEL_TICK_DELTA;
  let actions = driver.actions({ bridge: true });

  for (let i = 0; i < WHEEL_TICKS_PER_GESTURE; i++) {
    if (i > 0) {
      actions = actions.pause(WHEEL_TICK_PAUSE_MS);
    }
    actions = actions.scroll(0, 0, 0, tickDelta);
  }

  await actions.perform();
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

    const direction = current < targetView ? 1 : -1;
    await wheelGestureBurst(driver, direction);
    await driver.sleep(GESTURE_SETTLE_MS);
  }

  const final = await getCurrentView(driver);
  throw new Error(
    `Timed out waiting for currentView ${targetView} (still ${final})`,
  );
}

/**
 * Home → Basic (React Router link text), then wait for the stats overlay.
 * @param {import('selenium-webdriver').WebDriver} driver
 */
async function openBasicDemo(driver) {
  await driver.get(DEMO_URL);

  const basicLink = await driver.wait(
    until.elementLocated(By.linkText('Basic')),
    30_000,
  );
  await driver.wait(until.elementIsVisible(basicLink), 10_000);
  await basicLink.click();

  const stats = await driver.wait(
    until.elementLocated(By.css('.full-view-stats')),
    30_000,
  );
  await driver.wait(until.elementIsVisible(stats), 10_000);
}

/**
 * Smoke test for the Vite "basic" demo: load home, open Basic, wheel-scroll.
 * @param {import('selenium-webdriver').WebDriver} driver
 */
async function runSmokeTest(driver) {
  await openBasicDemo(driver);

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

module.exports = {
  runSmokeTest,
  openBasicDemo,
  getCurrentView,
  wheelGestureBurst,
};
