// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
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

  // ---------- Scroll-reveal animations ----------
  // Elements with class="reveal" or "reveal-stagger" fade/slide into view
  // the first time they cross into the viewport. Respects users who have
  // "prefers-reduced-motion" set — the CSS handles that fallback.
  const revealTargets = document.querySelectorAll(".reveal, .reveal-stagger");

  if (revealTargets.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target); // animate once, not every scroll
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support — just show everything
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  // ---------- 3D tilt on product images (mouse-follow parallax) ----------
  // Only enabled for devices with a real mouse/pointer, so touchscreens
  // (which have no "hover" concept) get the plain fallback hover styles
  // from CSS instead of a tilt that can't track a moving finger.
  const supportsHoverTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const tiltCards = document.querySelectorAll(".product-card");
  const MAX_TILT_DEG = 9;    // how far the card rotates at the extreme edges (kept moderate to avoid the rendered card's tilted edge slipping out from under a fast-moving cursor)
  const LIFT_PX = 8;         // how far the card lifts toward the viewer

  if (supportsHoverTilt && tiltCards.length) {
    tiltCards.forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        card.classList.add("tilting");
      });

      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;  // 0 → 1 across the card
        const y = (e.clientY - rect.top) / rect.height;  // 0 → 1 down the card

        const rotateY = (x - 0.5) * MAX_TILT_DEG * 2;      // left/right tilt
        const rotateX = -(y - 0.5) * MAX_TILT_DEG * 2;     // up/down tilt

        card.style.transform =
          "perspective(1000px) " +
          "rotateX(" + rotateX.toFixed(2) + "deg) " +
          "rotateY(" + rotateY.toFixed(2) + "deg) " +
          "translateY(-" + LIFT_PX + "px) " +
          "scale(1.025)";

        // move the glare highlight to follow the cursor
        card.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      });

      card.addEventListener("mouseleave", function () {
        card.classList.remove("tilting");
        card.style.transform = "";
      });
    });
  }

  // ---------- 3D draggable product carousel ----------
  const stage = document.getElementById("showcase3d-stage");
  const carousel = document.getElementById("showcase3d-carousel");

  if (stage && carousel) {
    const items = carousel.querySelectorAll(".showcase3d-item");
    const count = items.length;
    const radius = Math.round(230 / Math.sin(Math.PI / count)); // spacing so items don't overlap

    items.forEach(function (item, i) {
      const angle = (360 / count) * i;
      item.style.setProperty("--i", i);
      item.style.transform =
        "rotateY(" + angle + "deg) translateZ(" + radius + "px)";
    });

    let currentAngle = 0;     // the carousel's resting rotation
    let dragOffset = 0;       // live offset while actively dragging
    let isDragging = false;
    let startX = 0;
    const AUTOSPIN_SPEED = 0.045; // degrees per animation frame (~2.7deg/sec at 60fps)
    const DRAG_SENSITIVITY = 0.35;

    function applyRotation() {
      carousel.style.transform = "rotateY(" + (currentAngle + dragOffset) + "deg)";
    }

    function tick() {
      if (!isDragging) {
        currentAngle += AUTOSPIN_SPEED;
      }
      applyRotation();
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    function dragStart(clientX) {
      isDragging = true;
      startX = clientX;
      stage.classList.add("dragging");
    }
    function dragMove(clientX) {
      if (!isDragging) return;
      dragOffset = (clientX - startX) * DRAG_SENSITIVITY;
    }
    function dragEnd() {
      if (!isDragging) return;
      currentAngle += dragOffset;
      dragOffset = 0;
      isDragging = false;
      stage.classList.remove("dragging");
    }

    // mouse
    stage.addEventListener("mousedown", function (e) { dragStart(e.clientX); });
    window.addEventListener("mousemove", function (e) { dragMove(e.clientX); });
    window.addEventListener("mouseup", dragEnd);

    // touch
    stage.addEventListener("touchstart", function (e) { dragStart(e.touches[0].clientX); }, { passive: true });
    stage.addEventListener("touchmove", function (e) { dragMove(e.touches[0].clientX); }, { passive: true });
    stage.addEventListener("touchend", dragEnd);
  }
});
