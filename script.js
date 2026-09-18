/* Website behaviour. Loaded at the end of index.html, after the markup.
   These initialization blocks run in order: later blocks use elements
   created by earlier ones. Each function keeps its variables local. */

// 1. Language buttons, motion toggle, decorative wheat and pointer tilt

(() => {
  const root = document.getElementById("srm-film");
  const pause = root.querySelector(".sf-motion");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  // data-en and data-ne hold both translations; root.lang chooses the visible one.
  root.querySelectorAll("[data-language]").forEach((button) =>
    button.addEventListener("click", () => {
      root.lang = button.dataset.language;
      root
        .querySelectorAll("[data-en]")
        .forEach((el) => (el.textContent = el.dataset[root.lang]));
      root
        .querySelectorAll("[data-language]")
        .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    }),
  );
  pause.addEventListener("click", () => {
    const paused = root.classList.toggle("paused");
    pause.setAttribute("aria-pressed", String(paused));
    pause.dataset.en = paused ? "Play motion" : "Pause motion";
    pause.dataset.ne = paused ? "एनिमेसन चलाउनुहोस्" : "एनिमेसन रोक्नुहोस्";
    pause.textContent = pause.dataset[root.lang];
  });

  // Fixed formulas spread the decorative wheat without random layout changes.
  const holder = root.querySelector(".sf-grains");
  for (let i = 0; i < 23; i++) {
    const g = document.createElement("span");
    g.className = "sf-kernel" + (i % 3 ? " wheat" : "");
    const x = 45 + ((i * 37) % 53);
    const y = 10 + ((i * 29) % 76);
    g.style.setProperty("--x", x + "%");
    g.style.setProperty("--y", y + "%");
    g.style.setProperty("--w", (i % 5 === 0 ? 24 : 10 + (i % 12)) + "px");
    g.style.setProperty("--r", i * 57 + "deg");
    g.style.setProperty("--delay", -i * 0.55 + "s");
    g.style.setProperty("--blur", i % 6 === 0 ? "1px" : "0px");
    holder.appendChild(g);
  }
  const hero = root.querySelector(".sf-hero"),
    img = root.querySelector(".sf-product-image");

  // Tilt follows a mouse or pen; touch, paused and reduced-motion modes skip it.
  hero.addEventListener("pointermove", (e) => {
    if (
      reduced.matches ||
      root.classList.contains("paused") ||
      e.pointerType === "touch"
    )
      return;
    const r = hero.getBoundingClientRect();
    img.style.setProperty(
      "--ry",
      ((e.clientX - r.left) / r.width - 0.5) * 12 + "deg",
    );
    img.style.setProperty(
      "--rx",
      -((e.clientY - r.top) / r.height - 0.5) * 8 + "deg",
    );
  });
  hero.addEventListener("pointerleave", () => {
    img.style.setProperty("--ry", "0deg");
    img.style.setProperty("--rx", "0deg");
  });
})();

// 2. Prepare bilingual rice content and decorative particle layers

(() => {
  const root = document.getElementById("srm-film");
  const replace = (element, en, ne) => {
    element.dataset.en = en;
    element.dataset.ne = ne;
    element.textContent = element.dataset[root.lang];
  };
  replace(root.querySelector("h1 em"), "Every day.", "हरेक दिन।");
  replace(
    root.querySelector(".sf-copy p"),
    "Freshly ground wheat flour for soft rotis, family kitchens, and everyday meals. Prepared with care, straight from our mill.",
    "नरम रोटी, घरको भान्सा र दैनिक भोजनका लागि ताजा पिसिएको गहुँको आटा। हाम्रो मिलबाट ध्यानपूर्वक तयार गरिएको।",
  );
  replace(
    root.querySelector('.sf-navlinks a[href="#sf-mill"]'),
    "Our Rice",
    "हाम्रो चामल",
  );
  const story = root.querySelector(".sf-story");
  story.classList.add("sf-rice-section");
  const art = story.querySelector(".sf-story-art");
  art.classList.add("sf-rice-art");
  art.querySelector("img").alt =
    "Ivory bowl of Rice with a cascade of clearly defined grains and golden paddy";
  replace(
    story.querySelector(".sf-kicker"),
    "02 / PURE RICE. ITS OWN STORY.",
    "०२ / शुद्ध चामलको आफ्नै कथा।",
  );
  const h = story.querySelectorAll("h2 span");
  replace(h[0], "Pure Rice.", "शुद्ध चामल।");
  replace(h[1], "Every grain, cared for.", "हरेक दानामा ध्यान।");
  replace(
    story.querySelector("p"),
    "Clean, carefully milled Rice, ready to wash and cook. Our automatic process handles husking and cleaning, bringing everyday convenience to your kitchen.",
    "सफा र ध्यानपूर्वक पिसिएको चामल, धोएर पकाउन तयार। स्वचालित भुस छुट्याइ र सफाइ प्रक्रियाले तपाईंको भान्सामा दैनिक सुविधा ल्याउँछ।",
  );
  const features = story.querySelectorAll(".sf-feature span:last-child");
  replace(
    features[0],
    "Automatic husking & milling",
    "स्वचालित भुस छुट्याइ र पिसाइ",
  );
  replace(
    features[1],
    "Clean grains, less sorting at home",
    "सफा दाना, घरमा कम छान्नुपर्ने",
  );
  replace(features[2], "Ready to wash, cook & enjoy", "धोएर पकाउन तयार");
  root
    .querySelectorAll(".sf-grains .sf-kernel")
    .forEach((g) => g.classList.add("wheat"));
  const flourLayer = root.querySelector(".sf-grains");
  for (let i = 0; i < 45; i++) {
    const p = document.createElement("span");
    p.className = "sf-flour-particle";
    p.style.setProperty("--x", 46 + ((i * 17) % 48) + "%");
    p.style.setProperty("--y", 49 + ((i * 23) % 38) + "%");
    p.style.setProperty("--size", 1 + (i % 3) + "px");
    p.style.setProperty("--dx", -45 + ((i * 13) % 90) + "px");
    p.style.setProperty("--delay", -i * 0.27 + "s");
    flourLayer.appendChild(p);
  }
  const stream = document.createElement("div");
  stream.className = "sf-rice-flow";
  stream.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 24; i++) {
    const g = document.createElement("span");
    g.className = "sf-rice-drop";
    g.style.setProperty("--x", 51 + ((i * 13) % 27) + "%");
    g.style.setProperty("--y", 2 + ((i * 7) % 17) + "%");
    g.style.setProperty("--size", 9 + (i % 6) + "px");
    g.style.setProperty("--delay", -i * 0.19 + "s");
    g.style.setProperty("--r", 40 + ((i * 23) % 80) + "deg");
    stream.appendChild(g);
  }
  art.appendChild(stream);
})();

// 3. Insert the roti section and wire its manual flip button

(() => {
  const root = document.getElementById("srm-film");

  // Move the template into the page before selecting or animating its contents.
  const template = document.getElementById("sf-roti-template");
  const section = template.content.firstElementChild;
  root.insertBefore(section, root.querySelector(".sf-rice-section"));
  template.remove();
  const art = section.querySelector(".sf-roti-art");
  const tawa = section.querySelector(".sf-roti-tawa");
  const bread = tawa.cloneNode();
  bread.className = "sf-roti-bread";
  bread.alt = "";
  bread.setAttribute("aria-hidden", "true");
  art.insertBefore(bread, art.querySelector(".sf-steam"));
  const button = section.querySelector(".sf-flip");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let timeout;
  const reset = () => {
    art.classList.remove("flipping");
    button.disabled = false;
    clearTimeout(timeout);
  };
  button.addEventListener("click", () => {
    if (reduced.matches || root.classList.contains("paused")) return;
    art.classList.add("flipping");
    button.disabled = true;

    // Re-enable the button after the 1.35-second CSS flip has finished.
    timeout = setTimeout(reset, 1450);
  });
  const motion = root.querySelector(".sf-motion");
  motion.addEventListener("click", () => {
    button.disabled = root.classList.contains("paused");
    if (button.disabled) {
      art.classList.remove("flipping");
      clearTimeout(timeout);
    }
  });
  const nav = document.createElement("a");
  nav.href = "#sf-roti";
  nav.dataset.en = "Roti";
  nav.dataset.ne = "रोटी";
  nav.textContent = "Roti";
  root
    .querySelector(".sf-navlinks")
    .insertBefore(nav, root.querySelector('.sf-navlinks a[href="#sf-mill"]'));
  const riceKicker = root.querySelector(".sf-rice-section .sf-kicker");
  riceKicker.dataset.en = "03 / PURE RICE. ITS OWN STORY.";
  riceKicker.dataset.ne = "०३ / शुद्ध चामलको आफ्नै कथा।";
  riceKicker.textContent = riceKicker.dataset[root.lang];
  const contactKicker = root.querySelector(".sf-contact .sf-kicker");
  contactKicker.dataset.en = "04 / LET'S TALK";
  contactKicker.dataset.ne = "०४ / सम्पर्क गरौँ";
  contactKicker.textContent = contactKicker.dataset[root.lang];
})();

// 4. Refine the artwork and render the falling rice on a canvas

(() => {
  const root = document.getElementById("srm-film");
  root.classList.add("refined");
  const bread = root.querySelector(".sf-roti-bread");
  bread.src = "assets/images/roti-bread.webp";
  const pan = root.querySelector(".sf-roti-tawa");
  pan.alt = "Empty iron tawa beneath a single flipping Roti";
  const riceArt = root.querySelector(".sf-rice-art");
  riceArt.querySelector("img").alt =
    "Bowl of Rice with naturally falling individual grains";
  const flow = riceArt.querySelector(".sf-rice-flow");

  // Replace the initial CSS grain spans with the final canvas effect.
  flow.replaceChildren();
  const canvas = document.createElement("canvas");
  flow.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let w = 1,
    h = 1,
    elapsed = 0,
    last = 0,
    visible = true;
  const size = () => {
    const r = flow.getBoundingClientRect();
    w = r.width;
    h = r.height;

    // Cap pixel density at 2 to balance sharpness and canvas drawing cost.
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const resizeObserver = new ResizeObserver(size);
  resizeObserver.observe(flow);
  const visibilityObserver = new IntersectionObserver(
    (e) => (visible = e[0].isIntersecting),
  );
  visibilityObserver.observe(riceArt);
  size();

  // Deterministic seed values give each grain its own lane, size and timing.
  const grains = Array.from({ length: 520 }, (_, i) => ({
    phase: (i * 0.61803398875) % 1,
    lane: Math.sin(i * 12.9898),
    depth: (i * 0.754877666) % 1,
    size: 0.72 + (i % 9) * 0.072,
    twist: i * 2.39996,
    band: i % 3,
  }));

  // Draw four grain textures once, then reuse them on every animation frame.
  const sprites = Array.from({ length: 4 }, (_, index) => {
    const c = document.createElement("canvas");
    c.width = 100;
    c.height = 34;
    const g = c.getContext("2d");
    const light = g.createLinearGradient(0, 3, 0, 29);
    light.addColorStop(0, "#fffef6");
    light.addColorStop(
      0.36,
      ["#fff9e5", "#f6edd7", "#fffaed", "#efe2c5"][index],
    );
    light.addColorStop(0.8, "#dfcda7");
    light.addColorStop(1, "#bfa47a");
    g.fillStyle = light;
    g.beginPath();
    g.moveTo(4, 18);
    g.bezierCurveTo(13, 2, 74, 1, 96, 15);
    g.bezierCurveTo(89, 29, 29, 34, 4, 18);
    g.fill();
    g.strokeStyle = "#ffffffc0";
    g.lineWidth = 1.3;
    g.beginPath();
    g.moveTo(17, 13);
    g.bezierCurveTo(40, 7, 64, 8, 83, 13);
    g.stroke();
    g.strokeStyle = "#b6a07a44";
    g.lineWidth = 0.65;
    g.beginPath();
    g.moveTo(24, 21);
    g.quadraticCurveTo(53, 26, 80, 19);
    g.stroke();
    return c;
  });
  let lastPaint = -100,
    paintedElapsed = -1,
    paintedW = 0,
    paintedH = 0;
  function draw(now) {
    if (!root.isConnected) {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      return;
    }
    requestAnimationFrame(draw);

    // Clamp elapsed time so returning to this tab cannot cause a large jump.
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    // Skip drawing while the rice section is off screen or the tab is hidden.
    if (!visible || document.hidden) return;
    const stopped = root.classList.contains("paused") || reduced.matches;
    if (!stopped) elapsed += dt;

    // Paint at most about 33 times per second; retain a still frame when paused.
    if (now - lastPaint < 30) return;
    if (
      stopped &&
      paintedElapsed === elapsed &&
      paintedW === w &&
      paintedH === h
    )
      return;
    lastPaint = now;
    paintedElapsed = elapsed;
    paintedW = w;
    paintedH = h;
    ctx.clearRect(0, 0, w, h);
    const mobile = w < 350;
    const count = mobile ? 340 : 520;
    const surge = 0.85 + 0.15 * Math.sin(elapsed * 0.85);
    const source = w * (0.58 + Math.sin(elapsed * 0.38) * 0.065);

    // Every stream lands inside the ellipse formed by the rice surface.

    // Draw distant grains first so foreground grains appear on top.
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < count; i++) {
        const grain = grains[i];
        const near = grain.depth > 0.89;
        if (near !== (pass === 1)) continue;
        const phase = (grain.phase + elapsed * (0.55 + grain.depth * 0.12)) % 1;
        const impactX =
          w * (0.49 + grain.lane * 0.17 + (grain.band - 1) * 0.023);
        const impactY = h * (0.635 + Math.sin(grain.twist) * 0.042);
        const launchX =
          source + (grain.band - 1) * w * 0.1 + grain.lane * w * 0.075;
        let x, y, alpha, rotation;

        // First 82%: accelerate toward the bowl. Final 18%: bounce and fade.
        if (phase < 0.82) {
          const p = phase / 0.82;
          const distance = 0.22 * p + 0.78 * p * p;
          x = launchX + (impactX - launchX) * p;
          y = -h * 0.11 + (impactY + h * 0.11) * distance;
          alpha = Math.min(1, p * 15) * (0.75 + grain.depth * 0.25);
          rotation = 1.05 + grain.twist * 0.09 + p * (2.2 + grain.lane * 1.3);
        } else {
          const bounce = (phase - 0.82) / 0.18;
          x = impactX + grain.lane * w * 0.045 * bounce;
          y = impactY - Math.sin(Math.PI * bounce) * (8 + grain.depth * 17);
          alpha = (1 - bounce) * 0.95;
          rotation = grain.twist + bounce * 4;
        }
        const len =
          (near ? 16 + w * 0.012 : 6.5 + w * 0.011) * grain.size * surge;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.drawImage(sprites[i % 4], -len / 2, -len * 0.17, len, len * 0.34);
        ctx.restore();
      }
    }
  }
  requestAnimationFrame(draw);
})();

// 5. Render Lucide icons and synchronize the document language

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();
  const root = document.getElementById("srm-film");
  root.querySelectorAll("[data-language]").forEach((button) =>
    button.addEventListener("click", () => {
      document.documentElement.lang = root.lang;
    }),
  );
});
