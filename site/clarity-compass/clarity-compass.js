if (window.location.protocol === "https:" || window.location.protocol === "http:") {
  let normalizedPath = window.location.pathname;

  if (normalizedPath.endsWith("/index.html")) {
    normalizedPath = normalizedPath.slice(0, -"/index.html".length) || "/";
  }

  if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  if (normalizedPath !== window.location.pathname) {
    const normalizedUrl = `${normalizedPath}${window.location.search}${window.location.hash}`;
    window.history.replaceState(null, "", normalizedUrl);
  }
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const reveals = document.querySelectorAll(".reveal");
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
