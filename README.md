# PR #2234: contributor allocation deadline evidence

Evidence for [SlopDotCash/slopdotcash#2234](https://github.com/SlopDotCash/slopdotcash/pull/2234).
This branch stores review evidence only. The fixing PR's source head is unchanged.

- Before: `a851de63d2a265409b005ec321e085b97e58fc64`, with the regression test overlaid.
- After: `936f03376dcc32cb970c6341dbd9761697c2a6eb`.
- Before fixture revision: `8a4a95cf0a8d696df9faa64ca9357f0e7674146c`.
- After fixture revision: `7aade1c8b3e316ada0fde966950a9eab14b3fbf5`.

The recordings use the real built application in Chromium with synthetic account and allocation responses and Playwright's clock. The repository's browser runner supplies its frozen registry fixture. No live allocation or transfer is represented.

| Viewport | Before the fix | After the fix |
| --- | --- | --- |
| Desktop, 1440 x 1000 | [MP4](before-desktop.mp4) · [Original WebM](before-desktop.webm) · [Screenshot](before-desktop.png) | [MP4](after-desktop.mp4) · [Original WebM](after-desktop.webm) · [Screenshot](after-desktop.png) · [200% zoom](after-desktop-200-percent.png) |
| Mobile, 320 x 800 | [MP4](before-mobile.mp4) · [Original WebM](before-mobile.webm) · [Screenshot](before-mobile.png) | [MP4](after-mobile.mp4) · [Original WebM](after-mobile.webm) · [Screenshot](after-mobile.png) · [200% text](after-mobile-200-percent.png) |

Open Payouts at 00:00 UTC with an allocation closing at 00:01 UTC and no confirmed wallet. Advance the browser clock 61 seconds without reloading. Before the fix, the page keeps “Awaiting wallet” and the registration link. After the fix, it shows “Unclaimed” and removes the link. The after recordings also include keyboard access and enlarged text or zoom.

All 36 affected desktop/mobile browser cases passed, including the on-time wallet control that remains “Scheduled”. The [browser diagnostics](browser-diagnostics.json) record no application console or first-party network failures in the deadline regression. The PR contains complete commands, broader test results, and limitations.

The SHA-256 manifest identifies the original, unmodified WebM recordings and screenshots, plus MP4 playback copies. The MP4 files were transcoded with FFmpeg (H.264, CRF 18, yuv420p, faststart), without trimming, overlays, or speed changes. This evidence branch was published with Git at the contributor's explicit request.

AI assistance: OpenAI / gpt-6-astra / codex-desktop 26.1027.6604.0.
