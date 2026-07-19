function initContract() {
  const display = document.getElementById("ca-display");
  const copyBtn = document.getElementById("copy-ca");
  const toast = document.getElementById("copy-toast");
  if (!display || !copyBtn || !toast) return;

  const address = display.textContent.trim();

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(address);
      copyBtn.classList.add("copied");
      copyBtn.querySelector("span").textContent = "Copied!";
      toast.textContent = "Contract address copied!";
      toast.classList.add("show");

      setTimeout(() => {
        copyBtn.classList.remove("copied");
        copyBtn.querySelector("span").textContent = "Copy";
        toast.classList.remove("show");
      }, 2500);
    } catch {
      toast.textContent = "Copy failed — select and copy manually.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2500);
    }
  });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const header = document.querySelector(".site-header");
  if (!toggle || !links || !header) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  nodes.forEach((el) => io.observe(el));
}

function initOrbs() {
  const field = document.getElementById("fx-orbs");
  if (!field) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const count = window.innerWidth < 700 ? 8 : 14;

  for (let i = 0; i < count; i++) {
    const orb = document.createElement("span");
    orb.className = "fx-orb";
    const size = 40 + Math.random() * 120;
    orb.style.width = size + "px";
    orb.style.height = size + "px";
    orb.style.left = Math.random() * 100 + "%";
    orb.style.bottom = "-10%";
    orb.style.animationDuration = 12 + Math.random() * 18 + "s";
    orb.style.animationDelay = Math.random() * 10 + "s";
    field.appendChild(orb);
  }
}

function initBillRain() {
  const field = document.getElementById("bill-rain");
  if (!field) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const glyphs = ["$1", "$", "1", "◆", "$1", "$"];
  const count = window.innerWidth < 700 ? 16 : 28;

  for (let i = 0; i < count; i++) {
    const flake = document.createElement("span");
    flake.className = "bill-flake" + (i % 3 === 0 ? " ink" : "");
    flake.textContent = glyphs[i % glyphs.length];
    flake.style.left = Math.random() * 100 + "%";
    flake.style.fontSize = 0.75 + Math.random() * 1.35 + "rem";
    flake.style.animationDuration = 8 + Math.random() * 14 + "s";
    flake.style.animationDelay = Math.random() * 12 + "s";
    field.appendChild(flake);
  }
}

function initMemeParallax() {
  const meme = document.querySelector(".hero-meme");
  if (!meme) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || window.innerWidth < 769) return;

  let ticking = false;
  window.addEventListener(
    "pointermove",
    (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 16;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        meme.style.translate = `${x}px ${y}px`;
        ticking = false;
      });
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  initContract();
  initNav();
  initReveals();
  initBillRain();
  initOrbs();
  initMemeParallax();
});
