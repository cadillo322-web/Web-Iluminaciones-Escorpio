// ILUMINACIONES ESCORPIO — interacciones con JavaScript puro
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  function setMenu(open) {
    if (!menuToggle || !navMenu) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
    navMenu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });
    navLinks.forEach(link => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) setMenu(false);
    });
    document.addEventListener("click", event => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (isOpen && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        setMenu(false);
      }
    });
  }

  function updateHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const currentId = entry.target.id;
        navLinks.forEach(link => {
          const active = link.getAttribute("href") === `#${currentId}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const revealElements = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(element => element.classList.add("visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealElements.forEach(element => revealObserver.observe(element));
  }

  // Los enlaces marcados son provisionales. Sustitúyelos por datos reales antes de publicar.
  document.querySelectorAll("[data-placeholder-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      alert("Este enlace todavía es provisional. Configura el teléfono, correo o red social real en index.html antes de publicar la página.");
    });
  });
});
