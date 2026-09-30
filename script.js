document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Logo animado ----------
   Chrome, Edge y Firefox reproducen el WebM con transparencia.
   Safari no soporta VP9 con canal alfa, así que ahí va el WebP animado. */
(() => {
  const video = document.getElementById("kingVideo");
  const img = document.getElementById("kingImg");
  if (!video || !img) return;

  const ua = navigator.userAgent;
  const isSafari = /^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(ua);
  const canWebm = video.canPlayType('video/webm; codecs="vp9"') !== "";

  const useImage = (src) => {
    img.src = src;
    img.hidden = false;
    video.pause();
    video.remove();
  };

  if (reduceMotion.matches) {
    useImage("assets/logo.webp");
    return;
  }
  if (isSafari || !canWebm) {
    useImage("assets/logo-beso.webp");
    return;
  }
  video.addEventListener("error", () => useImage("assets/logo-beso.webp"), { once: true });
  video.querySelector("source")?.addEventListener("error", () => useImage("assets/logo-beso.webp"), { once: true });
  const p = video.play();
  if (p && p.catch) p.catch(() => useImage("assets/logo-beso.webp"));
})();

/* ---------- El rey sigue al puntero ---------- */
(() => {
  const hero = document.getElementById("hero");
  const tilt = document.getElementById("kingTilt");
  if (!hero || !tilt) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || reduceMotion.matches) return;

  let frame = 0;
  let nx = 0;
  let ny = 0;
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    nx = (e.clientX - r.left) / r.width - 0.5;
    ny = (e.clientY - r.top) / r.height - 0.5;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      tilt.style.setProperty("--ry", `${(nx * 16).toFixed(2)}deg`);
      tilt.style.setProperty("--rx", `${(-ny * 12).toFixed(2)}deg`);
      frame = 0;
    });
  });
  hero.addEventListener("pointerleave", () => {
    tilt.style.setProperty("--ry", "0deg");
    tilt.style.setProperty("--rx", "0deg");
  });
})();

/* ---------- La barra recibe al rey cuando el hero sale de pantalla ---------- */
(() => {
  const nav = document.getElementById("nav");
  const stage = document.getElementById("stage");
  const hero = document.getElementById("hero");
  if (!nav || !stage || !hero) return;

  new IntersectionObserver(
    ([entry]) => nav.classList.toggle("is-docked", !entry.isIntersecting),
    { rootMargin: `-${nav.offsetHeight}px 0px 0px 0px`, threshold: 0.15 }
  ).observe(stage);

  new IntersectionObserver(
    ([entry]) => nav.classList.toggle("is-scrolled", entry.intersectionRatio < 1),
    { threshold: [1] }
  ).observe(document.querySelector(".gingham--top"));

  // Pausar el logo cuando no se ve, para no gastar batería
  new IntersectionObserver(([entry]) => {
    const v = document.getElementById("kingVideo");
    if (!v) return;
    if (entry.isIntersecting) v.play().catch(() => {});
    else v.pause();
  }).observe(hero);
})();

/* ---------- Aparición de fotos al entrar en pantalla ---------- */
(() => {
  const items = document.querySelectorAll(".reveal");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
})();

/* ---------- Video del armado: botón de pausa y ahorro fuera de pantalla ---------- */
(() => {
  const video = document.getElementById("armadoVideo");
  const btn = document.getElementById("armadoToggle");
  if (!video || !btn) return;

  let userPaused = reduceMotion.matches;
  const sync = () => {
    const paused = video.paused;
    btn.setAttribute("aria-pressed", String(paused));
    btn.setAttribute("aria-label", paused ? "Reproducir video" : "Pausar video");
    btn.innerHTML = `<i class="ph-fill ${paused ? "ph-play" : "ph-pause"}" aria-hidden="true"></i>`;
  };

  if (userPaused) {
    video.removeAttribute("autoplay");
    video.pause();
  }
  btn.addEventListener("click", () => {
    if (video.paused) {
      userPaused = false;
      video.play().catch(() => {});
    } else {
      userPaused = true;
      video.pause();
    }
  });
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !userPaused) video.play().catch(() => {});
    else if (!entry.isIntersecting) video.pause();
  }, { threshold: 0.2 }).observe(video);
  sync();
})();

/* ---------- Pestañas de la carta ---------- */
(() => {
  const list = document.querySelector('[role="tablist"]');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];

  const select = (tab, focus = true) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      if (!panel) return;
      panel.hidden = !on;
      if (on) {
        panel.classList.remove("is-entering");
        void panel.offsetWidth;
        panel.classList.add("is-entering");
      }
    });
    if (focus) tab.focus();
    tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion.matches ? "auto" : "smooth" });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab, false));
    tab.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") next = tabs[0];
      if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        select(next);
      }
    });
  });
})();

/* ---------- El neón se prende al entrar en pantalla ---------- */
(() => {
  const sign = document.querySelector(".neon");
  if (!sign) return;
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    sign.classList.add("is-on");
    return;
  }
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      sign.classList.add("is-on");
      io.disconnect();
    }
  }, { threshold: 0.5 });
  io.observe(sign);
})();
