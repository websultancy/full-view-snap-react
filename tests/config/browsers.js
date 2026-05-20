/**
 * Browser matrix mapped from README.md "Browsers support".
 * Minimum versions are expressed as LambdaTest capability targets; tune via
 * https://www.lambdatest.com/capabilities-generator if a combo is unavailable.
 */

const { baseLtOptions } = require('./lambdatest');

/**
 * @typedef {Object} BrowserProfile
 * @property {string} id
 * @property {string} label
 * @property {'desktop' | 'mobile'} hub
 * @property {boolean} [requiresRealDevice] True when profile needs Real Device Plus (not free Automation)
 * @property {Record<string, unknown>} capabilities
 * @property {{ browser: string, min: string }} readme
 */

/** @type {BrowserProfile[]} */
const browsers = [
  // --- Desktop (virtual machines on hub.lambdatest.com) ---
  {
    id: 'safari-desktop',
    label: 'Safari 16 (macOS Ventura)',
    hub: 'desktop',
    readme: { browser: 'Safari', min: '16 (Ventura)' },
    capabilities: {
      browserName: 'Safari',
      browserVersion: '16.0',
      'LT:Options': {
        platformName: 'macOS Ventura',
      },
    },
  },
  {
    id: 'edge-desktop',
    label: 'Microsoft Edge 85+',
    hub: 'desktop',
    readme: { browser: 'Edge', min: '85+' },
    capabilities: {
      browserName: 'MicrosoftEdge',
      browserVersion: 'latest',
      'LT:Options': {
        platformName: 'Windows 11',
      },
    },
  },
  {
    id: 'firefox-desktop',
    label: 'Firefox 110+',
    hub: 'desktop',
    readme: { browser: 'Firefox', min: '110+' },
    capabilities: {
      browserName: 'Firefox',
      browserVersion: '110.0',
      'LT:Options': {
        platformName: 'Windows 11',
      },
    },
  },
  {
    id: 'chrome-desktop',
    label: 'Chrome 85+',
    hub: 'desktop',
    readme: { browser: 'Chrome', min: '85+' },
    capabilities: {
      browserName: 'Chrome',
      browserVersion: 'latest',
      'LT:Options': {
        platformName: 'Windows 11',
        resolution: '1920x1080',
      },
    },
  },

  // --- Mobile / real devices (mobile-hub; Real Device Plus — not on free Automation) ---
  {
    id: 'samsung-android',
    label: 'Samsung Internet (Android 9+)',
    hub: 'mobile',
    requiresRealDevice: true,
    readme: { browser: 'Samsung', min: 'Android 9+' },
    capabilities: {
      browserName: 'Samsung',
      'LT:Options': {
        platformName: 'android',
        deviceName: 'Galaxy S22',
        platformVersion: '12',
        isRealMobile: true,
      },
    },
  },
  {
    id: 'ios-safari',
    label: 'iOS Safari 14+',
    hub: 'mobile',
    requiresRealDevice: true,
    readme: { browser: 'iOS Safari', min: '14+' },
    capabilities: {
      browserName: 'Safari',
      'LT:Options': {
        platformName: 'ios',
        deviceName: 'iPhone 14',
        platformVersion: '16',
        isRealMobile: true,
      },
    },
  },
  {
    id: 'chrome-ios',
    label: 'Chrome iOS 132+ (iOS 16+)',
    hub: 'mobile',
    requiresRealDevice: true,
    readme: { browser: 'Chrome iOS', min: '132+ (iOS 16+)' },
    capabilities: {
      browserName: 'Chrome',
      'LT:Options': {
        platformName: 'ios',
        deviceName: 'iPhone 15',
        platformVersion: '17',
        isRealMobile: true,
      },
    },
  },
  {
    id: 'firefox-ios',
    label: 'Firefox iOS 141+ (iOS 16+)',
    hub: 'mobile',
    requiresRealDevice: true,
    readme: { browser: 'Firefox iOS', min: '141+ (iOS 16+)' },
    capabilities: {
      browserName: 'Firefox',
      'LT:Options': {
        platformName: 'ios',
        deviceName: 'iPhone 15',
        platformVersion: '17',
        isRealMobile: true,
      },
    },
  },
  {
    id: 'chrome-android',
    label: 'Chrome Android 128+ (Android 10+)',
    hub: 'mobile',
    requiresRealDevice: true,
    readme: { browser: 'Chrome Android', min: '128+ (Android 10+)' },
    capabilities: {
      browserName: 'Chrome',
      'LT:Options': {
        platformName: 'android',
        deviceName: 'Pixel 7',
        platformVersion: '13',
        isRealMobile: true,
      },
    },
  },
  {
    id: 'firefox-android',
    label: 'Firefox Android 140+ (Android 9+)',
    hub: 'mobile',
    requiresRealDevice: true,
    readme: { browser: 'Firefox Android', min: 'v140+ (Android 9+)' },
    capabilities: {
      browserName: 'Firefox',
      'LT:Options': {
        platformName: 'android',
        deviceName: 'Galaxy S22',
        platformVersion: '12',
        isRealMobile: true,
      },
    },
  },
];

/**
 * Merge profile capabilities with shared LT:Options (auth, build, test name).
 * @param {BrowserProfile} profile
 */
function buildCapabilities(profile) {
  const testName = `smoke / ${profile.label}`;
  const ltBase = baseLtOptions(testName);
  const profileLt = profile.capabilities['LT:Options'] ?? {};
  const { 'LT:Options': _ignored, ...rest } = profile.capabilities;

  return {
    ...rest,
    'LT:Options': {
      ...ltBase,
      ...profileLt,
      name: testName,
    },
  };
}

const desktopBrowsers = browsers.filter((b) => !b.requiresRealDevice);
const mobileRealDeviceBrowsers = browsers.filter((b) => b.requiresRealDevice);

function getBrowsersToRun() {
  const includeMobile = process.env.LT_INCLUDE_MOBILE === 'true';
  let pool = includeMobile ? browsers : desktopBrowsers;

  const filter = process.env.LT_BROWSERS;
  if (!filter) return pool;

  const ids = new Set(
    filter.split(',').map((s) => s.trim()).filter(Boolean),
  );
  const selected = pool.filter((b) => ids.has(b.id));
  if (selected.length === 0) {
    throw new Error(
      `LT_BROWSERS matched no profiles in the active pool (${includeMobile ? 'desktop+mobile' : 'desktop only'}). ` +
        `Known ids: ${pool.map((b) => b.id).join(', ')}`,
    );
  }
  return selected;
}

module.exports = {
  browsers,
  desktopBrowsers,
  mobileRealDeviceBrowsers,
  buildCapabilities,
  getBrowsersToRun,
};
