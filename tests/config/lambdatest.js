/**
 * LambdaTest grid settings.
 *
 * LT_MAX_PARALLEL defaults to 1 — aligned with the lowest-concurrency / cheapest
 * plans (single parallel automation session). Raise only when your subscription
 * allows more parallel sessions (see Automation dashboard → concurrency).
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const HUB_HOSTS = {
  desktop: 'hub.lambdatest.com/wd/hub',
  mobile: 'mobile-hub.lambdatest.com/wd/hub',
};

function parseMaxParallel() {
  const raw = process.env.LT_MAX_PARALLEL ?? '1';
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) {
    throw new Error(`LT_MAX_PARALLEL must be a positive integer, got "${raw}"`);
  }
  return n;
}

/** @type {number} */
const MAX_PARALLEL_SESSIONS = parseMaxParallel();

const BUILD_NAME = process.env.LT_BUILD ?? 'full-view-snap-react';

function requireDemoUrl() {
  const url = process.env.LT_DEMO_URL?.trim();
  if (!url) {
    throw new Error('Set LT_DEMO_URL (see tests/.env.example).');
  }
  return url;
}

/** @type {string} */
const DEMO_URL = requireDemoUrl();

function requireCredentials() {
  const username = process.env.LT_USERNAME;
  const accessKey = process.env.LT_ACCESS_KEY;
  if (!username || !accessKey) {
    throw new Error(
      'Set LT_USERNAME and LT_ACCESS_KEY (see tests/.env.example).',
    );
  }
  return { username, accessKey };
}

/**
 * @param {'desktop' | 'mobile'} hubKind
 */
function gridUrl(hubKind = 'desktop') {
  const { username, accessKey } = requireCredentials();
  const host = HUB_HOSTS[hubKind];
  return `https://${username}:${accessKey}@${host}`;
}

function tunnelLtOptions() {
  const tunnelName = process.env.LT_TUNNEL_NAME?.trim();
  if (!tunnelName) {
    return {};
  }
  return { tunnel: true, tunnelName };
}

/**
 * @param {string} testName
 */
function baseLtOptions(testName) {
  const { username, accessKey } = requireCredentials();
  return {
    user: username,
    accessKey,
    build: BUILD_NAME,
    name: testName,
    w3c: true,
    network: true,
    video: true,
    console: true,
    ...tunnelLtOptions(),
  };
}

module.exports = {
  MAX_PARALLEL_SESSIONS,
  DEMO_URL,
  BUILD_NAME,
  HUB_HOSTS,
  gridUrl,
  baseLtOptions,
  requireCredentials,
};
