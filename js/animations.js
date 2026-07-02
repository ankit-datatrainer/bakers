/* Fancy Baker — award-level animation layer
   1. Kinetic Typography  — staggered char reveal on headings
   2. Scroll Reveal       — cinematic section storytelling (clip + parallax)
   3. Parallax Motion     — depth on images, chips and floating layers
   4. Custom Cursor       — dot + trailing ring, magnetic buttons
   5. Micro-interactions  — tilt cards, ripple buttons, scroll progress
   All effects are skipped under prefers-reduced-motion or without GSAP. */
(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = window.matchMedia("(pointer: fine)").matches;
  if (REDUCED || !window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── 1. Kinetic Typography — split section headings into chars ── */
  function kineticType() {
    document.querySelectorAll(".section-head h2, .page-hero h1").forEach(h => {
      if (h.dataset.split) return;
      h.dataset.split = "1";
      h.innerHTML = h.textContent.split(" ").map(word =>
        `<span style="display:inline-block;white-space:nowrap">` +
        word.split("").map(ch => `<span class="kchar">${ch}</span>`).join("") +
        `</span>`
      ).join(" ");
      gsap.fromTo(h.querySelectorAll(".kchar"),
        { opacity: 0, y: "0.6em", rotateX: -70 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.02, ease: "back.out(1.8)",
          scrollTrigger: { trigger: h, start: "top 88%", once: true },
        });
    });
  }

  /* ── 2. Scroll Reveal storytelling — dark bands unclip, heads drift ── */
  function scrollStory() {
    document.querySelectorAll(".section-alt").forEach(sec => {
      gsap.fromTo(sec,
        { clipPath: "inset(6% 4% 6% 4% round 28px)", scale: 0.97 },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1, ease: "none",
          scrollTrigger: { trigger: sec, start: "top 90%", end: "top 40%", scrub: 0.6 },
        });
    });
    // Eyebrow pills pop in with a wobble
    document.querySelectorAll(".eyebrow").forEach(e => {
      gsap.from(e, {
        scale: 0, rotation: -8, duration: 0.55, ease: "back.out(2.5)",
        scrollTrigger: { trigger: e, start: "top 92%", once: true },
      });
    });
    // Cards settle with a slight hand-placed rotation (opacity/y handled by app.js reveal)
    document.querySelectorAll(".card-grid, .feature-grid, .gallery-grid").forEach(grid => {
      const cards = grid.children;
      if (!cards.length) return;
      gsap.from(cards, {
        rotation: () => gsap.utils.random(-3.5, 3.5),
        duration: 0.9, stagger: 0.07, ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 85%", once: true },
      });
    });
  }

  /* ── 3. Parallax Motion — images drift at different speeds ── */
  function parallax() {
    document.querySelectorAll(".split .visual, .blog-img, .hero-cake").forEach(el => {
      const img = el.querySelector("img");
      if (img) {
        img.style.willChange = "transform";
        gsap.fromTo(img, { yPercent: -8, scale: 1.12 }, {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    });
    // Hero chips float on mouse (depth layers)
    const hero = document.querySelector(".hero");
    if (hero && FINE) {
      const chips = hero.querySelectorAll(".hero-chip");
      const cake = hero.querySelector(".hero-cake");
      hero.addEventListener("pointermove", e => {
        const dx = e.clientX / innerWidth - 0.5, dy = e.clientY / innerHeight - 0.5;
        chips.forEach((c, i) => gsap.to(c, { x: dx * (18 + i * 10), y: dy * (12 + i * 8), duration: 0.8, ease: "power2.out" }));
        if (cake) gsap.to(cake, { x: dx * -14, y: dy * -10, duration: 1, ease: "power2.out" });
      });
    }
  }

  /* ── 4. Custom Cursor + magnetic buttons (desktop only) ── */
  function customCursor() {
    if (!FINE) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    document.documentElement.classList.add("has-cursor");

    const setDot = { x: gsap.quickTo(dot, "x", { duration: 0.08 }), y: gsap.quickTo(dot, "y", { duration: 0.08 }) };
    const setRing = { x: gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" }), y: gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" }) };
    window.addEventListener("pointermove", e => {
      setDot.x(e.clientX); setDot.y(e.clientY);
      setRing.x(e.clientX); setRing.y(e.clientY);
    }, { passive: true });

    const HOT = "a, button, .item-card, .filter-chip, input, select, textarea, summary";
    document.addEventListener("pointerover", e => {
      if (e.target.closest(HOT)) { dot.classList.add("on"); ring.classList.add("on"); }
    });
    document.addEventListener("pointerout", e => {
      if (e.target.closest(HOT)) { dot.classList.remove("on"); ring.classList.remove("on"); }
    });

    // Magnetic buttons — pull gently toward the cursor
    document.querySelectorAll(".btn").forEach(btn => {
      btn.style.transitionProperty = "box-shadow, background, color"; // GSAP owns transform
      btn.addEventListener("pointermove", e => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3 });
      });
      btn.addEventListener("pointerleave", () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" }));
    });
  }

  /* ── 5. Micro-interactions ── */
  function microInteractions() {
    // 3D tilt on product / feature cards
    if (FINE) {
      document.addEventListener("pointermove", e => {
        const card = e.target.closest(".item-card, .blog-card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
        card.style.transitionProperty = "box-shadow"; // let GSAP own transform, keep shadow ease
        gsap.to(card, { rotateX: rx, rotateY: ry, y: -6, transformPerspective: 700, duration: 0.35 });
      });
      document.addEventListener("pointerout", e => {
        const card = e.target.closest(".item-card, .blog-card");
        if (card && !card.contains(e.relatedTarget)) gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: 0.6, ease: "power3.out" });
      });
    }
    // Scroll progress crumb-trail bar
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

    // Animated counters in hero stats (counts up to the real value)
    document.querySelectorAll(".hero-stats .stat b").forEach(b => {
      const m = b.textContent.match(/^([\d.]+)(.*)$/);
      if (!m) return;
      const end = parseFloat(m[1]), suffix = m[2], dec = m[1].includes(".") ? 1 : 0;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end, duration: 1.6, ease: "power2.out", delay: 0.9,
        onUpdate: () => { b.textContent = obj.v.toFixed(dec) + suffix; },
        scrollTrigger: { trigger: b, start: "top 95%", once: true },
      });
    });

    // FAQ answers slide open smoothly
    document.querySelectorAll(".faq-item").forEach(d => {
      d.addEventListener("toggle", () => {
        if (d.open) gsap.from(d.querySelector(".faq-body"), { y: -8, opacity: 0, duration: 0.35, ease: "power2.out" });
      });
    });
  }

  kineticType();
  scrollStory();
  parallax();
  customCursor();
  microInteractions();
  // Dynamic grids (menu filters, product related) re-run reveals via FBReveal in app.js;
  // re-scan headings after fonts/layout settle so triggers measure correctly.
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
