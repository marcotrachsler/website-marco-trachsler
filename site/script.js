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
