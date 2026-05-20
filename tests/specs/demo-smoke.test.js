const { getBrowsersToRun } = require('../config/browsers');
const { MAX_PARALLEL_SESSIONS } = require('../config/lambdatest');
const { createDriver } = require('../lib/driver');
const { setLambdaStatus } = require('../lib/status');
const { runSmokeTest } = require('../lib/smoke');

if (MAX_PARALLEL_SESSIONS !== 1) {
  // eslint-disable-next-line no-console
  console.warn(
    `[lambdatest] LT_MAX_PARALLEL=${MAX_PARALLEL_SESSIONS}. Mocha is still invoked with --jobs 1; ` +
      'raise parallel runners only when your plan supports it.',
  );
}

const targets = getBrowsersToRun();

for (const profile of targets) {
  describe(`FullViewSnap smoke — ${profile.label}`, function () {
    this.timeout(120_000);

    /** @type {import('selenium-webdriver').WebDriver | undefined} */
    let driver;

    before(async function () {
      driver = await createDriver(profile);
    });

    after(async function () {
      if (driver) {
        await driver.quit();
      }
    });

    it('loads the basic demo, wheel-scrolls vertically, and updates currentView', async function () {
      try {
        await runSmokeTest(driver);
        await setLambdaStatus(driver, 'passed');
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        await setLambdaStatus(driver, 'failed', message);
        throw err;
      }
    });
  });
}
