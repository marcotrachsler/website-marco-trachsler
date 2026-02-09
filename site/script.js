const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
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
  { threshold: 0.22 }
);
reveals.forEach((node) => revealObserver.observe(node));

const navToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
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
