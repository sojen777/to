(function () {
  const config = window.LOVE_STORY_CONFIG;
  const wrapper = document.getElementById("storyWrapper");
  const progressCount = document.getElementById("progressCount");
  const progressFill = document.getElementById("progressFill");
  const finalOverlay = document.getElementById("finalOverlay");
  const finalOverlayEyebrow = document.getElementById("finalOverlayEyebrow");
  const finalOverlayTitle = document.getElementById("finalOverlayTitle");
  const finalOverlayBody = document.getElementById("finalOverlayBody");
  const finalOverlayClose = document.getElementById("finalOverlayClose");
  const musicToggle = document.getElementById("musicToggle");
  const swiperElement = document.querySelector(".story-swiper");

  if (!config || !Array.isArray(config.pages)) {
    throw new Error("LOVE_STORY_CONFIG.pages is required.");
  }

  document.title = config.meta?.title || document.title;
  finalOverlayEyebrow.textContent = config.meta?.finalOverlayEyebrow || "";
  finalOverlayTitle.textContent = config.meta?.finalOverlayTitle || "";
  finalOverlayBody.textContent = config.meta?.finalOverlayBody || "";
  finalOverlayClose.textContent = config.meta?.finalCloseLabel || "关闭";

  wrapper.innerHTML = config.pages.map((page, index) => renderSlide(page, index)).join("");

  bindMissingImages();
  bindFinalButtons();
  setupMusic();

  let activeIndex = getInitialIndex();
  let swiper = null;

  updateProgress(activeIndex);
  activateSlide(activeIndex);

  if (typeof window.Swiper === "function") {
    swiper = new Swiper(".story-swiper", {
      direction: "vertical",
      initialSlide: activeIndex,
      speed: 880,
      threshold: 8,
      resistanceRatio: 0.72,
      grabCursor: true,
      keyboard: {
        enabled: true
      },
      mousewheel: {
        forceToAxis: true,
        releaseOnEdges: true,
        sensitivity: 0.72
      },
      on: {
        init(instance) {
          activeIndex = instance.activeIndex;
          updateProgress(activeIndex);
          activateSlide(activeIndex);
        },
        slideChange(instance) {
          activeIndex = instance.activeIndex;
          updateProgress(activeIndex);
          activateSlide(activeIndex);
        }
      }
    });
  } else {
    setupNativeScrollFallback();
    requestAnimationFrame(() => {
      if (swiperElement) swiperElement.scrollTop = activeIndex * swiperElement.clientHeight;
    });
  }

  window.addEventListener("resize", () => updateProgress(swiper ? swiper.activeIndex : activeIndex), { passive: true });

  function renderSlide(page, index) {
    const style = themeStyle(page.theme);
    const layout = page.layout || "letter";
    const tone = page.theme?.tone || "default";
    const date = page.date ? `<div class="date-mark reveal anim-date">${escapeHtml(page.date)}</div>` : "";

    return `
      <section class="swiper-slide story-slide layout-${escapeAttr(layout)} tone-${escapeAttr(tone)}" style="${style}" data-slide-index="${index}" data-page-id="${escapeAttr(page.id || "")}">
        <div class="scene-backdrop" aria-hidden="true"></div>
        ${renderDecorations(page.decorations, index)}
        ${date}
        <div class="slide-inner">
          ${renderLayout(page, index)}
        </div>
      </section>
    `;
  }

  function renderLayout(page) {
    const titleBlock = renderTitleBlock(page);
    const body = renderBody(page.body);
    const media = renderMedia(page.images, page.layout);

    switch (page.layout) {
      case "cover":
        return `
          <div class="cover-copy">
            ${titleBlock}
            ${body}
          </div>
        `;
      case "intro":
        return `
          <div class="intro-copy">
            ${titleBlock}
            ${body}
          </div>
        `;
      case "cinema":
        return `
          <div class="cinema-photo">${renderSingleImage(page.images?.[0], "cinema-backdrop-photo")}</div>
          <div class="cinema-copy">
            ${titleBlock}
            ${body}
          </div>
        `;
      case "polaroid":
        return `
          <div class="polaroid-stage">
            ${media}
          </div>
          <div class="hand-note reveal anim-body">${body}</div>
          ${titleBlock}
        `;
      case "alternating":
        return `
          ${titleBlock}
          <div class="alternating-grid">
            ${renderAlternatingImages(page.images)}
          </div>
          ${body}
        `;
      case "report":
        return `
          ${titleBlock}
          <div class="report-board">
            <div class="report-media reveal anim-media">${renderSingleImage(page.images?.[0], "report__poster")}</div>
            <div class="report-stats">${renderStats(page.stats)}</div>
          </div>
          ${body}
        `;
      case "collage":
        return `
          ${titleBlock}
          <div class="collage-board">${media}</div>
          ${body}
        `;
      case "split":
        return `
          <div class="split-panel split-panel--cool">
            <span class="split-label reveal anim-body">难过</span>
            ${renderSingleImage(page.images?.[0], "split-image")}
          </div>
          <div class="split-panel split-panel--warm">
            ${titleBlock}
            ${body}
            ${renderSingleImage(page.images?.[1], "split-token")}
          </div>
        `;
      case "diagonal":
        return `
          <div class="diagonal-media">${media}</div>
          <div class="diagonal-copy">
            ${titleBlock}
            ${body}
          </div>
        `;
      case "tags":
        return `
          ${titleBlock}
          <div class="tag-scene">
            ${renderSingleImage(page.images?.[0], "tag-photo")}
            <div class="sticker-row reveal anim-body">${renderStickers(page.stickers)}</div>
          </div>
          ${body}
        `;
      case "sky":
        return `
          <div class="sky-line" aria-hidden="true"></div>
          ${titleBlock}
          <div class="sky-photo-wrap">${renderSingleImage(page.images?.[0], "sky-photo")}</div>
          ${body}
        `;
      case "countdown":
        return `
          ${titleBlock}
          <div class="countdown-list reveal anim-media">${renderCountdown(page.countdown)}</div>
          ${renderSingleImage(page.images?.[0], "countdown-flower")}
          ${body}
        `;
      case "finale":
        return `
          <div class="finale-photo">${renderSingleImage(page.images?.[0], "finale-bouquet")}</div>
          <div class="finale-copy">
            ${renderQuote(page.body)}
            ${titleBlock}
            ${renderFinalButton(page)}
          </div>
        `;
      case "letter":
      default:
        return `
          <div class="letter-copy">
            ${titleBlock}
            ${body}
          </div>
        `;
    }
  }

  function renderTitleBlock(page) {
    return `
      <header class="copy-block">
        ${page.subtitle ? `<p class="eyebrow reveal anim-eyebrow">${escapeHtml(page.subtitle)}</p>` : ""}
        <h1 class="slide-title reveal anim-title">${escapeHtml(page.title || "")}</h1>
      </header>
    `;
  }

  function renderBody(lines) {
    const safeLines = Array.isArray(lines) ? lines : [lines].filter(Boolean);
    if (!safeLines.length) return "";

    return `
      <div class="body-copy reveal anim-body">
        ${safeLines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
      </div>
    `;
  }

  function renderQuote(lines) {
    const quote = Array.isArray(lines) ? lines[0] : lines;
    return `<p class="finale-quote reveal anim-body">“${escapeHtml(quote || "")}”</p>`;
  }

  function renderMedia(images, layout) {
    const list = Array.isArray(images) ? images : [];
    if (!list.length) return "";

    return list
      .map((image, i) => {
        const rotation = [-7, 5, -3, 7][i % 4];
        return `
          <figure class="photo-frame photo-frame--${escapeAttr(layout || "default")} reveal anim-media" style="--rotation:${rotation}deg;--delay:${120 + i * 110}ms">
            <img src="${escapeAttr(image.src)}" alt="${escapeAttr(image.alt || image.caption || "")}" loading="${i === 0 ? "eager" : "lazy"}" />
            ${image.caption ? `<figcaption>${escapeHtml(image.caption)}</figcaption>` : ""}
          </figure>
        `;
      })
      .join("");
  }

  function renderSingleImage(image, className) {
    if (!image) {
      return `<div class="${escapeAttr(className || "")} image-placeholder reveal anim-media"><span></span></div>`;
    }

    return `
      <figure class="${escapeAttr(className || "")} single-photo reveal anim-media">
        <img src="${escapeAttr(image.src)}" alt="${escapeAttr(image.alt || image.caption || "")}" loading="lazy" />
        ${image.caption ? `<figcaption>${escapeHtml(image.caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  function renderAlternatingImages(images) {
    return (images || [])
      .map((image, index) => {
        const side = index % 2 === 0 ? "left" : "right";
        return `
          <figure class="alternate-photo alternate-photo--${side} reveal anim-media" style="--delay:${120 + index * 120}ms">
            <img src="${escapeAttr(image.src)}" alt="${escapeAttr(image.alt || image.caption || "")}" loading="eager" />
            ${image.caption ? `<figcaption>${escapeHtml(image.caption)}</figcaption>` : ""}
          </figure>
        `;
      })
      .join("");
  }

  function renderStats(stats) {
    return (stats || [])
      .map(
        (item, index) => `
        <div class="stat-tile reveal anim-body" style="--delay:${180 + index * 110}ms">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
        </div>
      `
      )
      .join("");
  }

  function renderStickers(stickers) {
    return (stickers || [])
      .map((item, index) => `<span style="--delay:${220 + index * 90}ms">${escapeHtml(item)}</span>`)
      .join("");
  }

  function renderCountdown(items) {
    return (items || [])
      .map(
        (item, index) => `
          <span class="countdown-step" style="--delay:${160 + index * 140}ms">
            <i>${String(index + 1).padStart(2, "0")}</i>${escapeHtml(item)}
          </span>
        `
      )
      .join("");
  }

  function renderFinalButton(page) {
    const label = page.cta?.label || "点这里";
    return `<button class="final-cta reveal anim-body" type="button" data-final-cta>${escapeHtml(label)}</button>`;
  }

  function renderDecorations(decorations, seed) {
    const list = Array.isArray(decorations) ? decorations : [];
    return `<div class="decor-layer" aria-hidden="true">${list.map((name) => renderDecoration(name, seed)).join("")}</div>`;
  }

  function renderDecoration(name, seed) {
    switch (name) {
      case "stars":
        return `<div class="stars-field">${renderParticles(42, seed, "star")}</div>`;
      case "petals":
        return `<div class="petal-field">${renderParticles(22, seed, "petal")}</div>`;
      case "softPetals":
        return `<div class="petal-field petal-field--soft">${renderParticles(10, seed, "petal")}</div>`;
      case "sunFlares":
        return `<div class="sun-flare sun-flare--one"></div><div class="sun-flare sun-flare--two"></div>`;
      case "lightVeil":
        return `<div class="light-veil"></div>`;
      case "moon":
        return `<div class="moon-disc"></div>`;
      case "moonPath":
        return `<div class="moon-path"></div>`;
      case "grain":
        return `<div class="paper-grain"></div>`;
      case "reportGrid":
        return `<div class="report-grid-lines"></div>`;
      case "warmLamp":
        return `<div class="warm-lamp"></div>`;
      case "rainToWarm":
        return `<div class="rain-lines"></div>`;
      case "breath":
        return `<div class="breathing-light"></div>`;
      case "daisyGlow":
        return `<div class="daisy-glow"></div>`;
      case "kite":
        return `<div class="kite-shape"><span></span></div>`;
      case "cloudLines":
        return `<div class="cloud-lines"></div>`;
      case "paperTape":
        return `<div class="paper-tape paper-tape--one"></div><div class="paper-tape paper-tape--two"></div>`;
      case "sunsetGlow":
        return `<div class="sunset-wash"></div>`;
      default:
        return "";
    }
  }

  function renderParticles(count, seed, className) {
    return Array.from({ length: count }, (_, index) => {
      const x = pseudoRandom(seed * 19 + index * 7) * 100;
      const y = pseudoRandom(seed * 31 + index * 11) * 100;
      const size = className === "star" ? 1 + pseudoRandom(index + seed) * 2.6 : 8 + pseudoRandom(index + seed) * 13;
      const delay = pseudoRandom(seed + index * 5) * 6;
      const duration = 5 + pseudoRandom(seed * 13 + index) * 8;
      return `<span class="${className}" style="--x:${x.toFixed(2)}%;--y:${y.toFixed(2)}%;--size:${size.toFixed(2)}px;--delay:${delay.toFixed(2)}s;--duration:${duration.toFixed(2)}s"></span>`;
    }).join("");
  }

  function pseudoRandom(value) {
    const x = Math.sin(value + 1) * 10000;
    return x - Math.floor(x);
  }

  function themeStyle(theme = {}) {
    const entries = {
      "--bg": theme.bg,
      "--bg2": theme.bg2,
      "--ink": theme.ink,
      "--muted": theme.muted,
      "--accent": theme.accent,
      "--accent2": theme.accent2,
      "--paper": theme.paper
    };

    return Object.entries(entries)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}:${escapeAttr(value)}`)
      .join(";");
  }

  function updateProgress(activeIndex) {
    const total = config.pages.length;
    const current = activeIndex + 1;
    progressCount.textContent = `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    progressFill.style.transform = `scaleY(${current / total})`;
  }

  function activateSlide(activeIndex) {
    document.getElementById("app")?.classList.toggle("is-final-slide", activeIndex === config.pages.length - 1);
    document.querySelectorAll(".story-slide").forEach((slide, index) => {
      slide.classList.toggle("is-active", index === activeIndex);
    });
  }

  function setupNativeScrollFallback() {
    swiperElement?.classList.add("no-swiper");
    let ticking = false;

    swiperElement?.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const nextIndex = Math.max(0, Math.min(config.pages.length - 1, Math.round(swiperElement.scrollTop / swiperElement.clientHeight)));
          if (nextIndex !== activeIndex) {
            activeIndex = nextIndex;
            updateProgress(activeIndex);
            activateSlide(activeIndex);
          }
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  function getInitialIndex() {
    const value = new URLSearchParams(window.location.search).get("slide");
    const parsed = Number.parseInt(value || "0", 10);
    if (!Number.isFinite(parsed)) return 0;
    return Math.max(0, Math.min(config.pages.length - 1, parsed));
  }

  function bindMissingImages() {
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => {
        const frame = img.closest("figure") || img.parentElement;
        frame?.classList.add("image-missing");
        img.remove();
      });
    });
  }

  function bindFinalButtons() {
    document.querySelectorAll("[data-final-cta]").forEach((button) => {
      button.addEventListener("click", () => {
        finalOverlay.classList.add("is-open");
        finalOverlay.setAttribute("aria-hidden", "false");
      });
    });

    finalOverlayClose.addEventListener("click", closeFinalOverlay);
    finalOverlay.addEventListener("click", (event) => {
      if (event.target === finalOverlay) closeFinalOverlay();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && finalOverlay.classList.contains("is-open")) {
        closeFinalOverlay();
      }
    });
  }

  function closeFinalOverlay() {
    finalOverlay.classList.remove("is-open");
    finalOverlay.setAttribute("aria-hidden", "true");
  }

  function setupMusic() {
    const src = config.music?.src;
    const autoplay = config.music?.autoplay !== false;
    let audio = null;
    let gestureFallbackBound = false;

    musicToggle.title = config.music?.label || "";
    musicToggle.classList.toggle("is-empty", !src);

    if (src) {
      audio = new Audio(src);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 1;
      audio.muted = false;
      audio.addEventListener("loadstart", () => {
        musicToggle.setAttribute("aria-label", "音乐加载中");
      });
      audio.addEventListener("waiting", () => {
        musicToggle.setAttribute("aria-label", "音乐缓冲中");
      });
      audio.addEventListener("playing", () => {
        musicToggle.classList.add("is-playing");
        musicToggle.classList.remove("is-empty");
        musicToggle.setAttribute("aria-label", "暂停背景音乐");
      });
      audio.addEventListener("pause", () => {
        musicToggle.classList.remove("is-playing");
        musicToggle.setAttribute("aria-label", "播放背景音乐");
      });
      audio.addEventListener("error", () => {
        musicToggle.classList.add("is-empty");
        musicToggle.setAttribute("aria-label", "未添加背景音乐");
      });
      audio.load();
    }

    async function waitForPlayable(timeout = 4000) {
      if (!audio) return false;
      if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) return true;

      musicToggle.setAttribute("aria-label", "音乐加载中");

      return new Promise((resolve) => {
        let settled = false;
        const done = (result) => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve(result);
        };
        const cleanup = () => {
          audio.removeEventListener("canplay", onPlayable);
          audio.removeEventListener("loadeddata", onPlayable);
          audio.removeEventListener("error", onError);
          clearTimeout(timer);
        };
        const onPlayable = () => done(true);
        const onError = () => done(false);
        const timer = setTimeout(() => done(audio.readyState > HTMLMediaElement.HAVE_NOTHING), timeout);

        audio.addEventListener("canplay", onPlayable);
        audio.addEventListener("loadeddata", onPlayable);
        audio.addEventListener("error", onError);
      });
    }

    function isAutoplayBlocked(error) {
      const message = String(error?.message || "");
      return error?.name === "NotAllowedError" || /gesture|interact|not allowed|permission/i.test(message);
    }

    async function playAudio({ allowGestureFallback = false, waitForBuffer = false } = {}) {
      if (!audio) return false;

      try {
        if (waitForBuffer) {
          await waitForPlayable();
        }

        await audio.play();
        musicToggle.classList.add("is-playing");
        musicToggle.classList.remove("is-empty");
        musicToggle.setAttribute("aria-label", "暂停背景音乐");
        return true;
      } catch (error) {
        musicToggle.classList.remove("is-playing");
        musicToggle.setAttribute("aria-label", "播放背景音乐");

        if (allowGestureFallback && isAutoplayBlocked(error)) {
          bindGestureAutoplayFallback();
        }

        return false;
      }
    }

    function bindGestureAutoplayFallback() {
      if (gestureFallbackBound || !audio) return;
      gestureFallbackBound = true;

      const retry = () => {
        document.removeEventListener("pointerdown", retry);
        document.removeEventListener("keydown", retry);
        document.removeEventListener("touchstart", retry);
        playAudio();
      };

      document.addEventListener("pointerdown", retry, { once: true, passive: true });
      document.addEventListener("keydown", retry, { once: true });
      document.addEventListener("touchstart", retry, { once: true, passive: true });
    }

    musicToggle.addEventListener("click", async () => {
      if (!audio) {
        musicToggle.classList.toggle("is-empty");
        return;
      }

      if (audio.paused) {
        await playAudio();
      } else {
        audio.pause();
        musicToggle.classList.remove("is-playing");
        musicToggle.setAttribute("aria-label", "播放背景音乐");
      }
    });

    if (autoplay && audio) {
      bindGestureAutoplayFallback();
      requestAnimationFrame(() => {
        playAudio({ allowGestureFallback: true, waitForBuffer: true });
      });
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }
})();
