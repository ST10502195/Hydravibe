// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  // Scroll reveal: show sections as they enter the screen
  const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });

    // close menu when a link is clicked (mobile)
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
      });
    });
  }

  // Highlight the current page in the nav
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  // Basic front-end validation feedback for forms (no backend in this phase)
  const forms = document.querySelectorAll("form[data-demo-form]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const note = form.querySelector(".form-note");
      if (note) {
        note.textContent = "Thanks! This form is a front-end demo for the assignment brief — no data is submitted yet.";
        note.style.display = "block";
      }
    });
  });
});
