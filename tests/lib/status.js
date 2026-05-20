/**
 * Report pass/fail to LambdaTest so sessions are not left as "Completed" only.
 * @param {import('selenium-webdriver').WebDriver} driver
 * @param {'passed' | 'failed'} status
 * @param {string} [remark]
 */
async function setLambdaStatus(driver, status, remark = '') {
  const payload =
    status === 'passed'
      ? 'lambda-status=passed'
      : `lambda-status=failed${remark ? `\n${remark}` : ''}`;
  try {
    await driver.executeScript(payload);
  } catch {
    // Best-effort; quitting still ends the session.
  }
}

module.exports = { setLambdaStatus };
