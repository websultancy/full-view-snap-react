const webdriver = require('selenium-webdriver');
const { gridUrl } = require('../config/lambdatest');
const { buildCapabilities } = require('../config/browsers');

/**
 * @param {import('../config/browsers').BrowserProfile} profile
 */
async function createDriver(profile) {
  const capabilities = buildCapabilities(profile);
  const url = gridUrl(profile.hub);

  return new webdriver.Builder()
    .usingServer(url)
    .withCapabilities(capabilities)
    .build();
}

module.exports = { createDriver };
