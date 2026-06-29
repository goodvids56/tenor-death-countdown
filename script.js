// ===================================================================
// Tenor API Death Countdown
// Counts down to June 30, 2026 — the day Google kills the Tenor API.
// At the moment of death the page turns red, shakes, plays clock.mp3
// exactly once, and flips to counting UP: "____ since tenor died".
// ===================================================================

// Month is 0-indexed: 5 = June. Tenor API shuts down June 30, 2026 (UTC).
const DEATH_TIME = Date.UTC(2026, 5, 30, 0, 0, 0);

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  status: document.getElementById("status"),
  eyebrow: document.getElementById("eyebrow"),
  title: document.getElementById("title"),
  clock: document.getElementById("clock"),
  flash: document.getElementById("flash"),
  sound: document.getElementById("death-sound"),
  soundPrompt: document.getElementById("sound-prompt"),
};

let isDead = false;       // have we crossed into the dead state yet?
let soundPlayed = false;  // ensure clock.mp3 plays only one time

const pad = (n) => String(n).padStart(2, "0");

// Try to play the death sound exactly once. Browsers may block autoplay
// without a user gesture, so on failure we surface a tap-to-play button.
function playDeathSound() {
  if (soundPlayed || !els.sound) return;
  const attempt = els.sound.play();
  if (attempt && typeof attempt.then === "function") {
    attempt
      .then(() => {
        soundPlayed = true;
        els.soundPrompt.hidden = true;
      })
      .catch(() => {
        // Autoplay blocked — let the user trigger it.
        els.soundPrompt.hidden = false;
      });
  } else {
    soundPlayed = true;
  }
}

els.soundPrompt.addEventListener("click", () => {
  els.sound.currentTime = 0;
  els.sound.play().then(() => {
    soundPlayed = true;
    els.soundPrompt.hidden = true;
  }).catch(() => {});
});

// Switch the page into its dramatic "dead" presentation.
function enterDeadState() {
  if (isDead) return;
  isDead = true;
  document.body.classList.add("dead");
  els.flash.classList.add("fire");
  els.eyebrow.textContent = "💀 It happened";
  els.title.textContent = "The Tenor API is dead";
  els.status.textContent = "since tenor died";
  playDeathSound();
}

function render() {
  const now = Date.now();
  const diff = DEATH_TIME - now;

  if (diff > 0) {
    // ---- Counting down to death ----
    const totalSeconds = Math.floor(diff / 1000);
    els.days.textContent = Math.floor(totalSeconds / 86400);
    els.hours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
    els.minutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
    els.seconds.textContent = pad(totalSeconds % 60);
  } else {
    // ---- Tenor has died: count UP since the moment of death ----
    if (!isDead) enterDeadState();

    const elapsed = Math.floor(-diff / 1000);
    els.days.textContent = Math.floor(elapsed / 86400);
    els.hours.textContent = pad(Math.floor((elapsed % 86400) / 3600));
    els.minutes.textContent = pad(Math.floor((elapsed % 3600) / 60));
    els.seconds.textContent = pad(elapsed % 60);
  }
}

render();
setInterval(render, 1000);
