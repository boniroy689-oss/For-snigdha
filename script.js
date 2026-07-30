// Elements
const hero = document.querySelector(".hero");
const letter = document.getElementById("letter");
const gallery = document.getElementById("gallery");
const reasons = document.getElementById("reasons");
const proposal = document.getElementById("proposal");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const galleryNext = document.getElementById("galleryNext");
const reasonNext = document.getElementById("reasonNext");

const typeTarget = document.getElementById("typewriter");
const finalMessage = document.getElementById("finalMessage");

const photos = [
  { src: "images/photo1.jpg", alt: "Portrait: person in white outfit beside window, wearing glasses" },
  { src: "images/photo2.jpg", alt: "Two soft-focus portraits of the same person wearing red; dreamy collage style" },
  { src: "images/photo3.jpg", alt: "Person mid-dance in a bright red saree with a colorful pallu, wearing glasses" }
];

// TYPEWRITER MESSAGE
const message = `Dear Snigdha ❤️,

Happy Girlfriend Day.

I know this isn't the biggest gift in the world...

But I wanted to make something with my own hands.

Every line of code here was written while thinking about you.

Thank you for being such a wonderful person.

— Boni ❤️`;

// Start / Typewriter
startBtn.addEventListener("click", () => {
  hero.classList.add("hidden");
  letter.classList.remove("hidden");
  runTypewriter(typeTarget, message, 35);
});

function runTypewriter(targetEl, text, speed) {
  targetEl.textContent = "";
  let i = 0;
  function step() {
    if (i < text.length) {
      targetEl.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    } else {
      // finished
    }
  }
  step();
}

// Navigation buttons
nextBtn.addEventListener("click", () => {
  letter.classList.add("hidden");
  gallery.classList.remove("hidden");
  gallery.focus?.();
});

galleryNext.addEventListener("click", () => {
  gallery.classList.add("hidden");
  reasons.classList.remove("hidden");
});

reasonNext.addEventListener("click", () => {
  reasons.classList.add("hidden");
  proposal.classList.remove("hidden");
});

// Floating hearts (gentle falling hearts)
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 18) + "px";
  heart.style.animationDuration = (3 + Math.random() * 4) + "s";
  document.getElementById("hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}, 600);

// PROPOSAL BUTTONS
const yesBtn = document.getElementById("yesBtn");
const laterBtn = document.getElementById("laterBtn");

yesBtn.addEventListener("click", () => {
  finalMessage.innerHTML = `
    ❤️ Thank you, Snigdha ❤️
    <br><br>
    You just made Boni the happiest person alive.
    <br><br>
    Happy Girlfriend Day 🌸
  `;
  fireConfetti();
});

laterBtn.addEventListener("click", () => {
  finalMessage.innerHTML = `
    🌸 It's completely okay.
    <br><br>
    I respect your feelings.
    <br><br>
    Thank you for taking the time to read everything.
    ❤️
  `;
});

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbCaption = document.getElementById("lbCaption");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");

let currentIndex = 0;

// Attach click handlers to thumbnails
document.querySelectorAll(".photo-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const idx = Number(btn.dataset.index || 0);
    openLightbox(idx);
  });
});

// open lightbox
function openLightbox(index) {
  currentIndex = index;
  const p = photos[index];
  lbImage.src = p.src;
  lbImage.alt = p.alt;
  lbCaption.textContent = p.alt;
  lightbox.classList.remove("hidden");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // freeze background scroll
  lbClose.focus();
}

// close lightbox
function closeLightbox() {
  lightbox.classList.add("hidden");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  // return focus to gallery
  gallery.querySelector(".photo-btn")?.focus();
}

lbClose.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click", () => showLightboxIndex(currentIndex - 1));
lbNext.addEventListener("click", () => showLightboxIndex(currentIndex + 1));

function showLightboxIndex(nextIndex) {
  currentIndex = (nextIndex + photos.length) % photos.length;
  const p = photos[currentIndex];
  lbImage.src = p.src;
  lbImage.alt = p.alt;
  lbCaption.textContent = p.alt;
}

// keyboard support
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("hidden")) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showLightboxIndex(currentIndex - 1);
    if (e.key === "ArrowRight") showLightboxIndex(currentIndex + 1);
  }
});

// CONFETTI (canvas-based, small and lightweight)
function fireConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  canvas.classList.remove("hidden");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const pieces = [];
  const colors = ["#ff4d6d", "#ffd166", "#ff8fa3", "#ffb3c6", "#ffffff"];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: 6 + Math.random() * 8,
      d: Math.random() * 40 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltSpeed: Math.random() * 0.1 + 0.05,
      speed: 1 + Math.random() * 3
    });
  }

  let frame = 0;
  const totalFrames = 240;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of pieces) {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      const x = p.x + Math.sin(frame / 10 + p.d) * 20;
      const y = p.y + (frame * p.speed) % (canvas.height + 100);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(p.tilt * Math.PI / 180);
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
      ctx.restore();
      p.tilt += p.tiltSpeed;
    }
    frame++;
    if (frame < totalFrames) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.add("hidden");
    }
  }
  requestAnimationFrame(draw);
}

// Resize confetti canvas on window resize
window.addEventListener("resize", () => {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas.classList.contains("hidden")) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
