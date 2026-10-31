/* Hydravibe — script.js (Parts 2 + 3) */

/* ---------- Product data (Part 3: dynamic listing) ---------- */
const PRODUCTS = [
  { id: "hyaluronic-acid-serum", w: 1122, name: "Hyaluronic Acid Serum", tag: "Serum", desc: "Intense hydration that plumps, smooths and glows. Gentle and fragrance-free. 30ml." },
  { id: "niacinamide-serum", w: 1024, name: "Niacinamide Serum", tag: "Serum", desc: "Brightens, balances and refines pores with 10% niacinamide and zinc PCA. 30ml." },
  { id: "eye-serum", w: 1024, name: "Eye Serum", tag: "Eye Care", desc: "Depuffs, hydrates and brightens with caffeine and peptides. 15ml." },
  { id: "milk-moisturiser", w: 1122, name: "Milk Moisturiser Cleanser", tag: "Cleanser", desc: "A creamy cleanser that melts away dirt while hydrating and nourishing. 150ml." },
  { id: "salicylic-acid-toner", w: 1024, name: "Salicylic Acid Exfoliating Toner", tag: "Toner", desc: "Unclogs and smooths with 2% salicylic acid and witch hazel. 150ml." },
  { id: "acne-spray", w: 1024, name: "Acne Spray Treatment", tag: "Treatment", desc: "Salicylic acid formula that treats and prevents acne on chest and back. 150ml." },
  { id: "night-mask", w: 1122, name: "Night Mask", tag: "Mask", desc: "Rich overnight mask with ceramides that repairs, renews and restores. 48ml." },
  { id: "overnight-cream", w: 1024, name: "Overnight Cream", tag: "Night Care", desc: "Hydrates, repairs and renews with ceramides, hyaluronic acid and niacinamide. 20ml." },
  { id: "eyelash-conditioner", w: 1024, name: "Advanced Eyelash Conditioner", tag: "Lash Care", desc: "Lightweight serum that supports longer, fuller-looking, healthier lashes. 5ml." }
];

/* ---------- Store locations for the Leaflet map (EDIT THESE) ---------- */
const STORES = [
  { name: "Hydravibe Store 1", lat: -33.9249, lng: 18.4241 },
  { name: "Hydravibe Store 2", lat: -33.9400, lng: 18.4600 }
];

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Mobile navigation toggle ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---------- Highlight current page ---------- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) link.classList.add("active");
  });

  /* ---------- Scroll reveal (Part 2 animation) ---------- */
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

  /* ---------- Accordion ---------- */
  document.querySelectorAll(".accordion-header").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      if (panel) panel.hidden = open;
    });
  });

  /* ---------- Lightbox + Modal ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const modal = document.getElementById("product-modal");

  function openLightbox(src, alt) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
  }
  function closeLightbox() { if (lightbox) lightbox.hidden = true; }

  function openModal(p) {
    if (!modal) return;
    document.getElementById("modal-img").src = "images/" + p.id + "-800w.jpg";
    document.getElementById("modal-img").alt = p.name;
    document.getElementById("modal-tag").textContent = p.tag;
    document.getElementById("modal-title").textContent = p.name;
    document.getElementById("modal-desc").textContent = p.desc;
    modal.hidden = false;
  }
  function closeModal() { if (modal) modal.hidden = true; }

  if (lightbox) lightbox.addEventListener("click", closeLightbox);
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.classList.contains("modal-close")) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeLightbox(); closeModal(); }
  });

  /* ---------- Dynamic product listing: search, filter, sort ---------- */
  const grid = document.getElementById("product-grid");
  if (grid) {
    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");
    const sortSelect = document.getElementById("sort");
    const countEl = document.getElementById("result-count");

    // build category options from the data
    Array.from(new Set(PRODUCTS.map(function (p) { return p.tag; }))).sort().forEach(function (tag) {
      const opt = document.createElement("option");
      opt.value = tag;
      opt.textContent = tag;
      categorySelect.appendChild(opt);
    });

    function cardHTML(p) {
      return '<div class="product-card">' +
        '<div class="thumb"><img class="zoomable" data-id="' + p.id + '" src="images/' + p.id + '-800w.jpg" ' +
        'srcset="images/' + p.id + '-480w.jpg 480w, images/' + p.id + '-800w.jpg 800w, images/' + p.id + '.jpg ' + p.w + 'w" ' +
        'sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 280px" alt="' + p.name + '" loading="lazy"></div>' +
        '<div class="info"><span class="tag">' + p.tag + '</span><h3>' + p.name + '</h3>' +
        '<p class="desc">' + p.desc + '</p>' +
        '<button type="button" class="quick-view" data-id="' + p.id + '">Quick view</button> ' +
        '<a href="enquiry.html" class="enquire">Enquire about this product →</a></div></div>';
    }

    function update() {
      const q = searchInput.value.trim().toLowerCase();
      const cat = categorySelect.value;
      let list = PRODUCTS.filter(function (p) {
        const matchText = (p.name + " " + p.tag + " " + p.desc).toLowerCase().indexOf(q) !== -1;
        return matchText && (cat === "all" || p.tag === cat);
      });
      list.sort(function (a, b) {
        return sortSelect.value === "za" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      });
      grid.innerHTML = list.length ? list.map(cardHTML).join("") :
        '<p class="no-results">No products match your search. Try a different word or category.</p>';
      countEl.textContent = "Showing " + list.length + " of " + PRODUCTS.length + " products";
    }

    [searchInput, categorySelect, sortSelect].forEach(function (el) {
      el.addEventListener("input", update);
      el.addEventListener("change", update);
    });

    grid.addEventListener("click", function (e) {
      const img = e.target.closest(".zoomable");
      const btn = e.target.closest(".quick-view");
      if (img) openLightbox("images/" + img.dataset.id + ".jpg", img.alt);
      if (btn) openModal(PRODUCTS.find(function (p) { return p.id === btn.dataset.id; }));
    });

    update();
  }

  /* ---------- Leaflet map (contact page) ---------- */
  const mapEl = document.getElementById("map");
  if (mapEl && window.L) {
    const map = L.map("map").setView([STORES[0].lat, STORES[0].lng], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    STORES.forEach(function (s) {
      L.marker([s.lat, s.lng]).addTo(map).bindPopup("<strong>" + s.name + "</strong>");
    });
  }

  /* ---------- Forms: validation + AJAX / email ---------- */
  function showError(field, msg) {
    field.classList.add("field-invalid");
    const span = document.createElement("span");
    span.className = "field-error";
    span.textContent = msg;
    field.insertAdjacentElement("afterend", span);
  }
  function clearErrors(form) {
    form.querySelectorAll(".field-error").forEach(function (el) { el.remove(); });
    form.querySelectorAll(".field-invalid").forEach(function (el) { el.classList.remove("field-invalid"); });
  }
  function validateForm(form) {
    clearErrors(form);
    let ok = true;
    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      if (["submit", "button", "hidden", "radio"].indexOf(field.type) !== -1) return;
      const value = field.value.trim();
      let msg = "";
      if (field.required && (field.type === "checkbox" ? !field.checked : !value)) {
        msg = "This field is required.";
      } else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        msg = "Please enter a valid email address.";
      } else if (field.type === "tel" && value && !/^[0-9+()\s-]{7,}$/.test(value)) {
        msg = "Please enter a valid phone number.";
      }
      if (msg) { showError(field, msg); ok = false; }
    });
    return ok;
  }
  function setNote(form, text, isError) {
    let note = form.querySelector(".form-note");
    if (!note) {
      note = document.createElement("p");
      note.className = "form-note";
      form.appendChild(note);
    }
    note.textContent = text;
    note.style.display = "block";
    note.classList.toggle("is-error", !!isError);
  }

  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.setAttribute("novalidate", "");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) {
        setNote(form, "Please fix the highlighted fields and try again.", true);
        return;
      }

      // Contact form: compile the details into an email
      const mailto = form.getAttribute("data-mailto");
      if (mailto) {
        const lines = [];
        new FormData(form).forEach(function (value, key) { lines.push(key + ": " + value); });
        window.location.href = "mailto:" + mailto +
          "?subject=" + encodeURIComponent("Hydravibe website message") +
          "&body=" + encodeURIComponent(lines.join("\n"));
        setNote(form, "Thanks! Your email app should open with your message ready to send.", false);
        return;
      }

      // Enquiry form: AJAX submission (no page reload)
      const endpoint = form.getAttribute("action");
      setNote(form, "Sending…", false);
      if (endpoint && endpoint.indexOf("http") === 0) {
        fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
          .then(function (res) {
            if (!res.ok) throw new Error("Request failed");
            form.reset();
            setNote(form, "Thank you! Your enquiry has been sent. We'll be in touch soon.", false);
          })
          .catch(function () {
            setNote(form, "Sorry, something went wrong. Please try again or email us directly.", true);
          });
      } else {
        setTimeout(function () {
          form.reset();
          setNote(form, "Thank you! Your enquiry has been received.", false);
        }, 600);
      }
    });
  });
});
