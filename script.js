// Tenor API death watch.
// Counts down to June 30, 2026, the day Google kills the public Tenor API.
// At zero the monitor goes from amber to red, shakes and glitches, plays
// clock.mp3 one time, and the clock starts counting up since the API died.

// Month is 0-indexed, so 5 is June. Target is June 30, 2026 00:00 UTC.
const DEATH_TIME = Date.UTC(2026, 5, 30, 0, 0, 0);

const el = {
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
  const diff = DEATH_TIME - Date.now();
  const secs = Math.floor(Math.abs(diff) / 1000);

  if (diff <= 0 && !dead) goCritical();

  el.days.textContent = Math.floor(secs / 86400);
  el.hours.textContent = pad(Math.floor((secs % 86400) / 3600));
  el.minutes.textContent = pad(Math.floor((secs % 3600) / 60));
  el.seconds.textContent = pad(secs % 60);
}

tick();
setInterval(tick, 1000);
