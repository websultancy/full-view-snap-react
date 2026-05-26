# Selenium cross-browser tests (TestMu AI / LambdaTest)

End-to-end smoke tests for [full-view-snap-react](../README.md) on the TestMu AI (LambdaTest) Selenium grid.

## Free Automation tier (what you can and cannot do)

TestMu’s products are billed separately. **Live Testing freemium ≠ Automation freemium.**

For **Automation → Free** (typical limits; confirm in [Billing / Subscriptions](https://accounts.lambdatest.com/billing/subscriptions)):

| Included | Not included on free |
|----------|----------------------|
| **Desktop web** Selenium on virtual browsers (Chrome, Firefox, Edge, Safari on Windows/macOS) | **Real-device** mobile (`isRealMobile`, `mobile-hub`) |
| **~100 automation minutes** (lifetime pool on free tier — check dashboard) | **Virtual mobile / emulators** (paid “Virtual Automation Cloud”, ~$139/mo) |
| **Up to 2 parallel** automation sessions | Real Device Plus automation (~$199/mo) |
| Tunnel for `localhost` / staging | Full README mobile matrix without upgrade |

**Implications for this repo**

- Default `npm test` runs **4 desktop profiles** only (`safari-desktop`, `edge-desktop`, `firefox-desktop`, `chrome-desktop`).
- The **6 mobile profiles** in `config/browsers.js` stay defined for when you upgrade, but are **skipped** unless `LT_INCLUDE_MOBILE=true`.
- You **cannot** match every README browser row on the free Automation plan; mobile rows need a paid mobile automation product.
- Watch **automation minutes**: one full desktop run ≈ 4 sessions × a few minutes each; budget ~25 full runs if the 100-minute cap still applies.

**Concurrency:** `LT_MAX_PARALLEL=1` and Mocha `--jobs 1` are safe on free (you may have 2 parallel slots; sequential avoids queue errors and minute burn from overlapping sessions).

## Prerequisites

- Node.js 18+
- TestMu AI account with **Automation** (not only Live)
- Credentials from [Account → Security](https://accounts.lambdatest.com/security)

```bash
cp .env.example .env
# LT_USERNAME, LT_ACCESS_KEY, LT_DEMO_URL (required)
cd tests && npm install
```

## Browser matrix

### Desktop (free Automation — default)

| ID | README target | Hub |
|----|---------------|-----|
| `safari-desktop` | Safari 16 (Ventura) | `hub.lambdatest.com` |
| `edge-desktop` | Edge 85+ | `hub.lambdatest.com` |
| `firefox-desktop` | Firefox 110+ | `hub.lambdatest.com` |
| `chrome-desktop` | Chrome 85+ | `hub.lambdatest.com` |

### Mobile (Real Device Plus — opt-in)

Requires `LT_INCLUDE_MOBILE=true` and a plan that includes real-device automation.

| ID | README target |
|----|---------------|
| `samsung-android` | Samsung, Android 9+ |
| `ios-safari` | iOS Safari 14+ |
| `chrome-ios` | Chrome iOS 132+ |
| `firefox-ios` | Firefox iOS 141+ |
| `chrome-android` | Chrome Android 128+ |
| `firefox-android` | Firefox Android 140+ |

Tune device/OS names in [`config/browsers.js`](./config/browsers.js) via the [Capabilities Generator](https://www.lambdatest.com/capabilities-generator) if a combo is rejected.

## Commands

```bash
# Default: desktop only (fits free Automation)
npm test

# Explicit desktop subset
npm run test:desktop

# One browser
npm run test:browser -- chrome-desktop

# Subset
LT_BROWSERS=chrome-desktop,firefox-desktop npm test

# All 10 profiles — only after mobile automation subscription
npm run test:all-profiles

# Mobile only (will fail on free tier)
npm run test:mobile
```

## Local demo + tunnel

1. Start Vite: `yarn dev` in `examples/vite` → `http://localhost:5173/vite/`
2. Start TestMu tunnel (same credentials as `.env`)
3. Set `LT_DEMO_URL=http://localhost:5173/vite/` (app root; test opens Basic via link)
4. Set `LT_TUNNEL_NAME` in `.env` to the tunnel name from the CLI (see `.env.example`)

When `LT_TUNNEL_NAME` is set, [`config/lambdatest.js`](./config/lambdatest.js) passes `tunnel: true` and `tunnelName` in `LT:Options` for all profiles.

## What is tested

`LT_DEMO_URL` should be the **Vite app root** (e.g. `…/vite/`). [`lib/smoke.js`](./lib/smoke.js) loads the home page, clicks the **Basic** link (`By.linkText('Basic')`), then checks `currentView === 0`, and simulates a **wheel gesture** (many small `deltaY` ticks chained in one W3C action with ~16ms between ticks), waits for snap to views `1` and `2`, and wheels back up to `0`.

## Project layout

```
tests/
  config/
    browsers.js      # Profiles + getBrowsersToRun() pool filter
    lambdatest.js      # Hub, env, baseLtOptions
  lib/ …
  specs/demo-smoke.test.js
```
