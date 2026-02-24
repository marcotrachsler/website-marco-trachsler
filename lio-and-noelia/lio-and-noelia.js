const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");
if (navToggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.classList.contains("open")) {
      return;
    }

    if (!(event.target instanceof Element)) {
      return;
    }

    if (event.target.closest(".menu-toggle") || event.target.closest("#nav-links")) {
      return;
    }

    closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener(
    "scroll",
    () => {
      if (!window.matchMedia("(max-width: 760px)").matches) {
        return;
      }
      closeNav();
    },
    { passive: true }
  );
}

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  reveals.forEach((node) => revealObserver.observe(node));
} else {
  reveals.forEach((node) => node.classList.add("is-visible"));
}
