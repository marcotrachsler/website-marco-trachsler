if (window.location.protocol === "https:" || window.location.protocol === "http:") {
  const currentPath = window.location.pathname;
  const isRootPath = currentPath === "/" || currentPath === "/index.html";

  if (isRootPath) {
    const currentUrl = new URL(window.location.href);
    const languageParam = (currentUrl.searchParams.get("lang") || "").toLowerCase();

    if (languageParam !== "en") {
      const browserLanguages = Array.isArray(navigator.languages)
        ? navigator.languages.slice()
        : [];
      if (navigator.language) {
        browserLanguages.push(navigator.language);
      }

      const prefersGerman =
        languageParam === "de" ||
        browserLanguages.some((language) => {
          const normalizedLanguage = String(language).toLowerCase();
          return normalizedLanguage === "de" || normalizedLanguage.startsWith("de-");
        });

      if (prefersGerman) {
        const germanUrl = new URL("/de/", window.location.origin);
        currentUrl.searchParams.forEach((value, key) => {
          if (key.toLowerCase() !== "lang") {
            germanUrl.searchParams.append(key, value);
          }
        });
        germanUrl.hash = currentUrl.hash;
        window.location.replace(germanUrl.toString());
      }
    }
  }
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
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
    { threshold: 0.22 }
  );
  reveals.forEach((node) => revealObserver.observe(node));
} else {
  reveals.forEach((node) => node.classList.add("is-visible"));
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

const sectionTargets = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];
const highlightActiveLink = () => {
  const scrollPos = window.scrollY + window.innerHeight * 0.28;
  let activeId = "";

  sectionTargets.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navAnchors.forEach((link) => {
    const pointsTo = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", pointsTo);
  });
};

window.addEventListener("scroll", highlightActiveLink, { passive: true });
window.addEventListener("resize", highlightActiveLink);
highlightActiveLink();

const clickableCards = document.querySelectorAll(".project-card-clickable[data-detail-url]");
const navigateToDetail = (card) => {
  const url = card.getAttribute("data-detail-url");
  if (url) {
    window.location.href = url;
  }
};

clickableCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) {
      return;
    }
    navigateToDetail(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.target !== card) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigateToDetail(card);
    }
  });
});
