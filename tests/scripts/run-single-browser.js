#!/usr/bin/env node
/**
 * Run smoke tests for one browser profile.
 * Usage: npm run test:browser -- chrome-desktop
 */

const { spawnSync } = require('child_process');
const { browsers } = require('../config/browsers');

const id = process.argv[2];
if (!id) {
  console.error(
    `Usage: npm run test:browser -- <browser-id>\n\nAvailable ids:\n  ${browsers.map((b) => b.id).join('\n  ')}`,
  );
  process.exit(1);
}

if (!browsers.some((b) => b.id === id)) {
  console.error(`Unknown browser id "${id}".`);
  process.exit(1);
}

const result = spawnSync(
  'npx',
  ['mocha', 'specs/demo-smoke.test.js', '--timeout', '120000', '--jobs', '1'],
  {
    cwd: require('path').join(__dirname, '..'),
    stdio: 'inherit',
    env: { ...process.env, LT_BROWSERS: id },
    shell: true,
  },
);

process.exit(result.status ?? 1);
