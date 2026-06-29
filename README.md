# tenor-death-countdown

A GitHub Pages site that counts down to June 30, 2026, the day Google shuts down
the public [Tenor GIF API](https://support.google.com/tenor/answer/10455265?hl=en).

When the deadline hits, the whole monitor goes from amber to red, the numbers
shake and glitch, `clock.mp3` plays one time, and the clock flips to counting up:
"since tenor died."

## The look

It is built to read like an amber CRT terminal watching a service die, because
that is what is happening. Tenor is a developer API, and on June 30 it stops
returning GIFs and starts returning errors. Amber is the normal "deprecated"
state; red is the dead one. The glow and scanlines are there to sell the old
phosphor monitor, not for decoration.

## Files

| File | What it does |
| --- | --- |
| `index.html` | Markup, copy, and the article links |
| `style.css` | The amber CRT styling and the red dead state |
| `script.js` | Countdown math and the switch to critical |
| `clock.mp3` | The sound that plays once when the API dies. Add this to the repo root. |

A note on the sound: browsers will not autoplay audio until someone interacts
with the page. If the deadline passes before any click, a `[ play the sound ]`
button appears so the visitor can trigger `clock.mp3`. It still only plays once.

## Putting it online

1. Push this repo to GitHub.
2. Open Settings, then Pages.
3. Under Source, pick "Deploy from a branch."
4. Choose your branch and the `/ (root)` folder, then save.
5. It goes live at `https://goodvids56.github.io/tenor-death-countdown/`.

## Where the date comes from

- [Google's Tenor API shutdown notice](https://support.google.com/tenor/answer/10455265?hl=en)
- [Developers reacting on Hacker News](https://news.ycombinator.com/item?id=46603473)
- [What it means for developers in 2026](https://digitalbiztalk.com/article/google-shuts-down-tenor-api-what-developers-need-to-know-in-2026)
- [GIFs already vanishing from X](https://roboin.io/article/en/2026/06/24/some-gifs-unavailable-on-x-due-to-tenor-api-shutdown/)

Made by goodvids56.
