/* Direction B — Signal Path. */
(() => {
  const root = document.documentElement;
  root.classList.add("js");

  const $ = (sel, scope = document) => scope.querySelector(sel);
  const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile menu */
  const bar = $("[data-bar]");
  const menu = $("[data-menu]");
  const setMenu = (open) => {
    bar.setAttribute("data-open", String(open));
    menu?.setAttribute("aria-expanded", String(open));
  };
  menu?.addEventListener("click", () => setMenu(bar.getAttribute("data-open") !== "true"));
  $$(".bar-nav a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

  /* YouTube: nothing loads until play is pressed */
  $$(".yt").forEach((tile) =>
    $(".yt-play", tile).addEventListener("click", () => {
      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube-nocookie.com/embed/${tile.dataset.yt}?autoplay=1&rel=0&playsinline=1`;
      frame.title = tile.dataset.title;
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      tile.append(frame);
      tile.classList.add("is-playing");
    }),
  );

  /* Loops and Shorts: silent, and only while pointed at */
  $$("[data-loop], [data-short]").forEach((cell) => {
    const video = $("video", cell);
    const start = () => {
      if (calm) return;
      if (!video.src) video.src = video.dataset.src;
      video.play().catch(() => {});
    };
    const stop = () => video.pause();
    cell.addEventListener("pointerenter", start);
    cell.addEventListener("pointerleave", stop);
    cell.addEventListener("click", () => (video.paused ? start() : stop()));
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
