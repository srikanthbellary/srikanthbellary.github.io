/* Direction A — Screening Room. */
(() => {
  const root = document.documentElement;
  root.classList.add("js");

  const $ = (sel, scope = document) => scope.querySelector(sel);
  const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const embed = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;

  const frame = (id, title) => {
    const el = document.createElement("iframe");
    el.src = embed(id);
    el.title = title;
    el.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    el.allowFullscreen = true;
    return el;
  };

  /* Mobile menu */
  const bar = $("[data-bar]");
  const menu = $("[data-menu]");
  const setMenu = (open) => {
    bar.setAttribute("data-open", String(open));
    menu?.setAttribute("aria-expanded", String(open));
  };
  menu?.addEventListener("click", () => setMenu(bar.getAttribute("data-open") !== "true"));
  $$(".bar-nav a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

  /* Gateway: a door wakes under the pointer or the keyboard, whichever moved last.
     The arrow keys pick a door and Enter opens it. The chosen door grows into the next page. */
  const gate = $("[data-gate]");
  if (gate) {
    const doors = $$("[data-door]", gate);
    const wake = (door) => {
      doors.forEach((item) => item.classList.toggle("is-active", item === door));
      gate.classList.toggle("has-active", Boolean(door));
    };
    doors.forEach((door) => {
      const point = (event) => {
        if (event.pointerType === "mouse" && !door.classList.contains("is-active")) wake(door);
      };
      door.addEventListener("pointerenter", point);
      door.addEventListener("pointermove", point);
      door.addEventListener("focus", () => door.matches(":focus-visible") && wake(door));
      door.addEventListener("blur", () => wake(doors.find((item) => item.matches(":hover")) ?? null));
      door.addEventListener("click", () => {
        door.style.viewTransitionName = "stage";
      });
    });
    gate.addEventListener("pointerleave", () => wake(doors.find((item) => item.matches(":focus-visible")) ?? null));
    window.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const index = { ArrowLeft: 0, ArrowUp: 0, ArrowRight: 1, ArrowDown: 1 }[event.key];
      if (index === undefined) return;
      event.preventDefault();
      doors[index].focus();
      wake(doors[index]);
    });
    // Coming back with the Back button restores the page as it was left: start it fresh.
    window.addEventListener("pageshow", () => {
      doors.forEach((door) => (door.style.viewTransitionName = ""));
      wake(doors.find((item) => item.matches(":hover")) ?? null);
    });
  }

  /* Days to release */
  $$("[data-countdown]").forEach((el) => {
    const [y, m, d] = el.dataset.countdown.split("-").map(Number);
    const days = Math.ceil((new Date(y, m - 1, d) - new Date()) / 86400000);
    el.textContent = days > 1 ? `In ${days} days` : days === 1 ? "Tomorrow" : "Out now";
  });

  /* Theater: the title-track video opens in its own room */
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

  /* Inline YouTube: nothing loads until play is pressed. The whole still is the target. */
  $$(".yt").forEach((tile) =>
    tile.addEventListener("click", () => {
      if (tile.classList.contains("is-playing")) return;
      const player = frame(tile.dataset.yt, tile.dataset.title);
      tile.append(player);
      tile.classList.add("is-playing");
      player.focus({ preventScroll: true });
    }),
  );

  /* Album canvases: the loop follows the track under the pointer */
  const play = (video) => {
    if (calm) return;
    if (!video.src && video.dataset.src) video.src = video.dataset.src;
    video.play().catch(() => {});
  };

  $$("[data-album]").forEach((album) => {
    const video = $(".canvas video", album);
    const label = $("[data-canvas-label]", album);
    const rows = $$(".trk", album);
    let visible = false;

    const cue = (row) => {
      if (row.classList.contains("is-on")) return;
      rows.forEach((item) => item.classList.toggle("is-on", item === row));
      if (!video) return;
      video.poster = row.dataset.still;
      video.dataset.src = row.dataset.loop;
      video.removeAttribute("src");
      video.load();
      if (label) label.textContent = row.dataset.label;
      if (visible) play(video);
    };

    rows.forEach((row) => {
      row.addEventListener("pointerenter", () => cue(row));
      row.addEventListener("focus", () => cue(row));
      row.addEventListener("click", () => cue(row));
    });

    if (video && "IntersectionObserver" in window) {
      new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) play(video);
          else video.pause();
        },
        { threshold: 0.35 },
      ).observe(video);
    }
  });

  /* Shorts: muted, and only while pointed at */
  $$("[data-short]").forEach((card) => {
    const video = $("video", card);
    const start = () => {
      play(video);
      card.classList.add("is-playing");
    };
    const stop = () => {
      video.pause();
      card.classList.remove("is-playing");
    };
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
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) =>
            link.setAttribute("aria-current", String(link.getAttribute("href") === `#${entry.target.id}`)),
          );
        }),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    $$("[data-spy]").forEach((section) => spy.observe(section));
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
