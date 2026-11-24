/* Direction C — Multitrack. */
(() => {
  const root = document.documentElement;
  root.classList.add("js");

  const $ = (sel, scope = document) => scope.querySelector(sel);
  const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hover = window.matchMedia("(hover: hover)").matches;
  const frozen = () => root.dataset.capture === "1";

  const frame = (id, title) => {
    const el = document.createElement("iframe");
    el.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
    el.title = title;
    el.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    el.allowFullscreen = true;
    return el;
  };

  /* Bar */
  const bar = $("[data-bar]");
  const menu = $("[data-menu]");
  const onScroll = () => bar.setAttribute("data-stuck", String(window.scrollY > 20));
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  const setMenu = (open) => {
    bar.setAttribute("data-open", String(open));
    menu?.setAttribute("aria-expanded", String(open));
  };
  menu?.addEventListener("click", () => setMenu(bar.getAttribute("data-open") !== "true"));
  $$(".bar-nav a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

  /* The name: fit both lines to the column at the middle of the width wave */
  const name = $(".name");
  const fitName = () => {
    if (!name) return;
    const marks = $$("i", name);
    marks.forEach((mark) => {
      mark.style.animation = "none";
      mark.style.fontStretch = "104%";
    });
    name.style.fontSize = "100px";
    const widest = Math.max(
      ...$$(".name-line", name).map((line) =>
        [...line.children].reduce((sum, mark) => sum + mark.getBoundingClientRect().width, 0),
      ),
    );
    const size = Math.min((name.clientWidth / widest) * 100 * 0.955, window.innerHeight * 0.19);
    name.style.fontSize = `${size.toFixed(1)}px`;
    marks.forEach((mark) => {
      mark.style.animation = "";
      mark.style.fontStretch = "";
    });
  };
  fitName();
  document.fonts?.ready.then(fitName);
  window.addEventListener("resize", fitName);

  /* Days to release */
  $$("[data-countdown]").forEach((el) => {
    const [y, m, d] = el.dataset.countdown.split("-").map(Number);
    const days = Math.ceil((new Date(y, m - 1, d) - new Date()) / 86400000);
    el.textContent = days > 1 ? `In ${days} days` : days === 1 ? "Tomorrow" : "Out now";
  });

  /* Session: one slice plays at a time, and the playhead moves on */
  const session = $("[data-session]");
  if (session) {
    const strip = $("[data-slices]", session);
    const slices = $$("[data-slice]", session);
    const nowEl = $("[data-now]", session);
    const toggle = $("[data-session-toggle]", session);
    let index = 0;
    let running = !calm;
    let held = false;
    let visible = true;
    let followTimer = 0;

    const activate = (next, follow = true) => {
      index = (next + slices.length) % slices.length;
      slices.forEach((el, i) => {
        const on = i === index;
        el.classList.toggle("is-on", on);
        const video = $("video", el);
        if (!video) return;
        if (on && !calm) {
          if (!video.src) video.src = video.dataset.src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
      nowEl.textContent = slices[index].dataset.now;
      // On narrow screens the strip scrolls; wait for the slices to settle before following.
      if (follow && strip.scrollWidth > strip.clientWidth + 4) {
        window.clearTimeout(followTimer);
        followTimer = window.setTimeout(
          () => strip.scrollTo({ left: slices[index].offsetLeft - strip.offsetLeft - 6, behavior: "smooth" }),
          640,
        );
      }
    };

    const paint = () => {
      session.dataset.session = running ? "playing" : "paused";
      toggle.setAttribute("aria-pressed", String(running));
      toggle.setAttribute("aria-label", running ? "Pause the session" : "Play the session");
    };
    paint();
    toggle.addEventListener("click", () => {
      running = !running;
      paint();
    });

    slices.forEach((el, i) => {
      el.addEventListener("pointerenter", (event) => {
        if (event.pointerType !== "mouse") return;
        held = true;
        activate(i, false);
      });
      el.addEventListener("pointerleave", () => (held = false));
      el.addEventListener("click", () => {
        if (i === index && (!hover || held)) window.location.hash = el.dataset.href;
        else activate(i);
      });
      el.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (i === index) window.location.hash = el.dataset.href;
        else activate(i);
      });
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.2 }).observe(session);
    }

    window.setInterval(() => {
      if (running && !held && visible && !frozen() && !document.hidden) activate(index + 1);
    }, 3400);
  }

  /* Theater for the hero film lane */
  const theater = $("[data-theater-dialog]");
  const theaterFrame = $("[data-theater-frame]");
  const theaterTitle = $("[data-theater-title]");
  $$("[data-theater]").forEach((button) =>
    button.addEventListener("click", () => {
      theaterFrame.replaceChildren(frame(button.dataset.theater, button.dataset.title));
      theaterTitle.textContent = button.dataset.title;
      theater.showModal();
    }),
  );
  theater?.addEventListener("close", () => theaterFrame.replaceChildren());
  theater?.addEventListener("click", (event) => {
    if (event.target === theater) theater.close();
  });

  /* Inline YouTube */
  $$(".yt").forEach((tile) =>
    $(".yt-play", tile).addEventListener("click", () => {
      tile.append(frame(tile.dataset.yt, tile.dataset.title));
      tile.classList.add("is-playing");
    }),
  );

  /* Track rows: the loop follows the pointer */
  const peek = $(".peek");
  if (peek && hover && !calm) {
    $$("[data-peek]").forEach((row) => {
      row.addEventListener("pointerenter", () => {
        peek.poster = row.dataset.still;
        peek.src = row.dataset.peek;
        peek.classList.add("is-on");
        peek.play().catch(() => {});
      });
      row.addEventListener("pointermove", (event) => {
        peek.style.setProperty("--px", `${event.clientX + 26}px`);
        peek.style.setProperty("--py", `${event.clientY - 160}px`);
      });
      row.addEventListener("pointerleave", () => {
        peek.classList.remove("is-on");
        peek.pause();
      });
    });
  }

  /* Shorts: muted, and only while pointed at */
  $$("[data-short]").forEach((card) => {
    const video = $("video", card);
    const start = () => {
      if (calm) return;
      if (!video.src) video.src = video.dataset.src;
      video.play().catch(() => {});
    };
    const stop = () => video.pause();
    card.addEventListener("pointerenter", start);
    card.addEventListener("pointerleave", stop);
    card.addEventListener("click", () => (video.paused ? start() : stop()));
  });

  /* Reveal on scroll, and the current section in the bar */
  const revealables = $$("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );
    revealables.forEach((el) => io.observe(el));

    const links = $$(".bar-nav a");
    const alias = { "coming-2027": "music", film: "music" };
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = alias[entry.target.id] ?? entry.target.id;
          links.forEach((link) => link.setAttribute("aria-current", String(link.getAttribute("href") === `#${id}`)));
        }),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    $$("main > section[id]").forEach((section) => spy.observe(section));
  } else {
    revealables.forEach((el) => el.classList.add("is-in"));
  }

  /* Ask about my work: not wired in the mockup */
  $("[data-ask]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const field = $("input", event.currentTarget);
    field.value = "";
    field.placeholder = field.dataset.off;
  });
})();
