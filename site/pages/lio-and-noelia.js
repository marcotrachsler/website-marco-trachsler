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

const videoLaunch = document.querySelector(".video-launch");

if (videoLaunch) {
  videoLaunch.addEventListener("click", () => {
    const videoId = videoLaunch.getAttribute("data-video-id");
    const videoTitle =
      videoLaunch.getAttribute("data-video-title") || "YouTube video";

    if (!videoId) {
      return;
    }

    // Some local preview contexts (file://) trigger YouTube Error 153.
    if (window.location.protocol === "file:") {
      window.open(
        `https://www.youtube.com/watch?v=${videoId}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    const params = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });

    if (window.location.origin && window.location.origin !== "null") {
      params.set("origin", window.location.origin);
    }

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    iframe.title = videoTitle;
    iframe.loading = "lazy";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "origin";
    iframe.allowFullscreen = true;

    videoLaunch.replaceWith(iframe);
  });
}
