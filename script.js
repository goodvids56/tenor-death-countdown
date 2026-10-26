// Tenor API death watch.
// Counts down to June 30, 2026, the day Google kills the public Tenor API.
// At zero the monitor goes from amber to red, shakes and glitches, plays
// clock.mp3 one time, and the clock starts counting up since the API died.

// Google runs on Pacific time, so the deadline is midnight on June 30, 2026
// in Los Angeles. In June that is PDT (UTC-7), which is 07:00 UTC.
// Month is 0-indexed, so 5 is June.
const DEATH_TIME = Date.UTC(2026, 5, 30, 7, 0, 0);

const el = {
  clock: document.querySelector(".clock"),
  millennia: document.getElementById("millennia"),
  centuries: document.getElementById("centuries"),
  decades: document.getElementById("decades"),
  years: document.getElementById("years"),
  months: document.getElementById("months"),
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  lead: document.getElementById("lead"),
  status: document.getElementById("status"),
  headline: document.getElementById("headline"),
  pill: document.getElementById("pill"),
  flash: document.getElementById("flash"),
  sound: document.getElementById("death-sound"),
  prompt: document.getElementById("sound-prompt"),
};

let dead = false;        // have we crossed the deadline yet?
let soundPlayed = false; // clock.mp3 plays one time only

const pad = (n) => String(n).padStart(2, "0");

// The big units stay hidden until their time comes: months shows up after
// the first month, years after the first year, and so on up to millennia.
// Days, hours, minutes, and seconds always show.
const BIG_UNITS = ["millennia", "centuries", "decades", "years", "months"];

// Add whole calendar months to a UTC timestamp. If the day doesn't exist in
// the target month (Jan 31 + 1 month), it clamps to that month's last day.
function addMonths(t, n) {
  const d = new Date(t);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + n;
  const lastDay = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return Date.UTC(y, m, Math.min(d.getUTCDate(), lastDay),
    d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
}

// Split the gap between two times into calendar months plus leftover
// days/hours/minutes/seconds, so "1 month" means an actual month on the
// calendar and not a flat 30 days.
function breakdown(a, b) {
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  const s = new Date(start);
  const e = new Date(end);

  let months = (e.getUTCFullYear() - s.getUTCFullYear()) * 12 +
    (e.getUTCMonth() - s.getUTCMonth());
  let anchor = addMonths(start, months);
  if (anchor > end) anchor = addMonths(start, --months);

  const secs = Math.floor((end - anchor) / 1000);
  const years = Math.floor(months / 12);

  return {
    millennia: Math.floor(years / 1000),
    centuries: Math.floor((years % 1000) / 100),
    decades: Math.floor((years % 100) / 10),
    years: years % 10,
    months: months % 12,
    days: Math.floor(secs / 86400),
    hours: Math.floor((secs % 86400) / 3600),
    minutes: Math.floor((secs % 3600) / 60),
    seconds: secs % 60,
  };
}

// Try to play the death sound once. Browsers block autoplay before any user
// gesture, so if that happens we show a button to let the visitor trigger it.
function playDeathSound() {
  if (soundPlayed || !el.sound) return;
  const p = el.sound.play();
  if (p && typeof p.then === "function") {
    p.then(() => {
      soundPlayed = true;
      el.prompt.hidden = true;
    }).catch(() => {
      el.prompt.hidden = false;
    });
  } else {
    soundPlayed = true;
  }
}

el.prompt.addEventListener("click", () => {
  el.sound.currentTime = 0;
  el.sound.play().then(() => {
    soundPlayed = true;
    el.prompt.hidden = true;
  }).catch(() => {});
});

function goCritical() {
  if (dead) return;
  dead = true;
  document.body.classList.add("dead");
  el.flash.classList.add("fire");
  el.headline.textContent = "The Tenor API is dead.";
  el.pill.textContent = "410 gone";
  el.lead.textContent = "time since shutdown";
  el.status.innerHTML = 'since tenor died<span class="cursor" aria-hidden="true">_</span>';
  playDeathSound();
}

function tick() {
  const now = Date.now();
  if (DEATH_TIME - now <= 0 && !dead) goCritical();

  const t = breakdown(DEATH_TIME, now);
  for (const key in t) el[key].textContent = pad(t[key]);

  // Once a bigger unit shows, every smaller one shows too (even at 00).
  let reached = false;
  let visible = 4;
  for (const key of BIG_UNITS) {
    reached = reached || t[key] > 0;
    const unit = el[key].parentElement;
    unit.hidden = !reached;
    unit.nextElementSibling.hidden = !reached; // the ":" after it
    if (reached) visible++;
  }
  // style.css sizes the clock off this, so fewer units means bigger digits.
  el.clock.style.setProperty("--units", visible);
}

tick();
setInterval(tick, 1000);
