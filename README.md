# tenor-death-countdown

A GitHub Pages website that counts down to **June 30, 2026** — the day Google
shuts down the public [Tenor GIF API](https://support.google.com/tenor/answer/10455265?hl=en).

When the moment arrives, the countdown turns **red**, shakes/glitches, plays
`clock.mp3` once, and flips to counting **up**: *"\_\_\_ since tenor died."*

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page markup, content, and article links |
| `style.css` | Styling, including the dramatic red "dead" state |
| `script.js` | Countdown logic + death transition |
| `clock.mp3` | Sound that plays once at the moment of death *(add this to the repo root)* |

> **Note:** browsers block autoplay with sound until a user interacts with the
> page. If the death moment happens before any interaction, a *"Tap to hear it
> die"* button appears so the visitor can trigger `clock.mp3` themselves. It
> still only ever plays one time.

## Enabling GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select branch `main` (or whichever you deploy) and folder `/ (root)`, then **Save**.
5. The site goes live at `https://goodvids56.github.io/tenor-death-countdown/`.

## Articles about the shutdown

- [Google's official Tenor API shutdown FAQ](https://support.google.com/tenor/answer/10455265?hl=en)
- [Discussion on Hacker News](https://news.ycombinator.com/item?id=46603473)
- [What developers need to know in 2026](https://digitalbiztalk.com/article/google-shuts-down-tenor-api-what-developers-need-to-know-in-2026)
- [Some GIFs already vanishing from X](https://roboin.io/article/en/2026/06/24/some-gifs-unavailable-on-x-due-to-tenor-api-shutdown/)

Made by goodvids56.
