# PR #2234: contributor allocation deadline evidence

Evidence for [SlopDotCash/slopdotcash#2234](https://github.com/SlopDotCash/slopdotcash/pull/2234). This separate branch stores review evidence, published with Git at the contributor's explicit request.

Current source head: `fccdb882e4e3c86a8fd70b95ff4c7b249bddd223`, based on `d80086e40911c8556bfe6418350fed5d2d974cf1`.

| Scenario | Before | After at current head |
| --- | --- | --- |
| Deadline timer, desktop | [Video](before-desktop.mp4) | [Video](revision-fccdb882/after-timer-desktop.mp4) · [Screenshot](revision-fccdb882/after-timer-desktop.png) · [200% zoom](revision-fccdb882/after-timer-desktop-200-percent.png) |
| Deadline timer, mobile | [Video](before-mobile.mp4) | [Video](revision-fccdb882/after-timer-mobile.mp4) · [Screenshot](revision-fccdb882/after-timer-mobile.png) · [200% text](revision-fccdb882/after-timer-mobile-200-percent.png) |
| Return via focus, desktop | [Video](revision-fccdb882/before-focus-desktop.mp4) | [Video](revision-fccdb882/after-focus-desktop.mp4) · [Screenshot](revision-fccdb882/after-focus-desktop.png) |
| Return via focus, mobile | [Video](revision-fccdb882/before-focus-mobile.mp4) | [Video](revision-fccdb882/after-focus-mobile.mp4) · [Screenshot](revision-fccdb882/after-focus-mobile.png) |
| Return via visibility, desktop | [Video](revision-fccdb882/before-visibilitychange-desktop.mp4) | [Video](revision-fccdb882/after-visibilitychange-desktop.mp4) · [Screenshot](revision-fccdb882/after-visibilitychange-desktop.png) |
| Return via visibility, mobile | [Video](revision-fccdb882/before-visibilitychange-mobile.mp4) | [Video](revision-fccdb882/after-visibilitychange-mobile.mp4) · [Screenshot](revision-fccdb882/after-visibilitychange-mobile.png) |

The real built application runs in Chromium at 1440 × 1000 and 320 × 800, with synthetic account/allocation responses and Playwright's clock. No live allocation or transfer is represented.

For the timer case, open Payouts at 00:00 UTC with registration closing at 00:01 UTC, then advance 61 seconds without reloading. The original base keeps “Awaiting wallet” and the registration link. The fixed page shows “Unclaimed” and removes the link. The after recording includes keyboard access and enlarged text or zoom. An on-time wallet control remains “Scheduled”.

For return cases, set a 00:10 UTC deadline, open at 00:00 UTC, then change the wall clock to 01:00 UTC without running timers. Dispatch `focus` or `visibilitychange`. All four cases fail before the follow-up and pass afterward. These simulate a delayed timer and a page-return event; they do not qualify physical device sleep or a particular operating system.

Source identity:

- Original timer before: `a851de63d2a265409b005ec321e085b97e58fc64`, regression test overlaid; fixture `8a4a95cf0a8d696df9faa64ca9357f0e7674146c`. Its `ContributorAllocation.tsx` blob is identical to the current base: `30270d0c7345be8cc7370a51704a04a12a515a25`.
- Return before: timer-only commit `9d3bd9136d24bf00a8e6fbcde466ab0775babb61`, new regression tests overlaid; fixture `d24dad9418a9957c4e229a73494dc46160b0fc75`.
- All current after captures: `fccdb882e4e3c86a8fd70b95ff4c7b249bddd223`; fixture `d32ca707a5a1fdce72972f30bb05841ee5934b2a`.

[Browser diagnostics](revision-fccdb882/browser-diagnostics.json) identify each selected case and show zero application console or first-party request failures. After cases also pass the repository's WCAG AA assertions. The PR records complete test commands, broader suite failures, and limits; this evidence does not claim the whole suite passed.

Every MP4 has an original WebM with the same basename. The [SHA-256 manifest](sha256.json) covers originals, screenshots and MP4 copies. FFmpeg produced H.264 CRF 18, yuv420p, faststart copies without trimming, overlays or speed changes.

The root-level after files are historical evidence for `936f03376dcc32cb970c6341dbd9761697c2a6eb`; their [original capture record](https://github.com/startrack3r/slopdotcash/blob/ab68a45b6121b9199af5f8832eac89eeb8cbe10d/README.md) remains available. Use the `revision-fccdb882` files for the current head.

AI assistance: OpenAI / gpt-6-astra / codex-desktop 26.1027.6604.0.
