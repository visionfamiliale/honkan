// ================= FOOTER YEAR AUTO-UPDATE =================
document.addEventListener("DOMContentLoaded", () => {
  const footerYearEl = document.getElementById("footerYear");
  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }
});

console.log("JS bien connecté !");


// ================= PARTENAIRES : REVEAL ON SCROLL =================
document.addEventListener("DOMContentLoaded", () => {
  const partnerCards = document.querySelectorAll(".partner-card");

  function revealPartners() {
    const triggerBottom = window.innerHeight * 0.85;

    partnerCards.forEach(card => {
      if (card.getBoundingClientRect().top < triggerBottom) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealPartners);
  revealPartners();
});


// ================= COUNTERS + PROGRESS BARS ANIMATION =================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.stat-number');
  const progressWraps = document.querySelectorAll('.progress-wrap');
  const speed = 1200;

  // ---- compteur animé ----
  function animateCounter(el, target) {
    let start = 0;
    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min((now - startTime) / speed, 1);
      const value = Math.floor(progress * (target - start) + start);

      el.textContent = target >= 1000 ? value.toLocaleString() : value;
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  // ---- reveal général ----
  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    // counters
    counters.forEach(c => {
      if (!c.dataset.animated && c.getBoundingClientRect().top < triggerBottom) {
        animateCounter(c, Number(c.getAttribute("data-target")));
        c.dataset.animated = "true";
      }
    });

    // progress bars
    progressWraps.forEach(wrap => {
      if (!wrap.dataset.animated && wrap.getBoundingClientRect().top < triggerBottom) {
        const p = Number(wrap.getAttribute("data-progress")) || 0;
        const fill = wrap.querySelector(".progress-fill");
        const percent = wrap.querySelector(".progress-percent");

        if (fill) fill.style.width = Math.min(Math.max(p, 0), 100) + "%";
        if (percent) percent.textContent = p + "%";

        wrap.dataset.animated = "true";
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});


// ================= PROGRAMMES COMPLÉMENTAIRES CARDS REVEAL =================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".pc-card");

  function revealPC() {
    cards.forEach(card => {
      if (card.getBoundingClientRect().top < window.innerHeight * 0.85) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealPC);
  revealPC();
});



// ================= TÉMOIGNAGES : REVEAL ON SCROLL =================
document.addEventListener("DOMContentLoaded", () => {
  const temoignages = document.querySelectorAll(".t-card");

  function revealTemoignages() {
    const triggerBottom = window.innerHeight * 0.85;

    temoignages.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealTemoignages);
  revealTemoignages();
});




/* ================= CONTACT PAGE JS ================= */
document.addEventListener('DOMContentLoaded', () => {
  // --- footer year auto update (réutilisable) ---
  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // --- reveal on scroll for blocks (form, right column, map, faq) ---
  const revealItems = document.querySelectorAll('.contact-left, .contact-right, .map-card, .faq-card');

  function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;
    revealItems.forEach(el => {
      if (el.dataset.visible) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger) {
        el.classList.add('visible');
        el.dataset.visible = 'true';
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // run once on load

  // --- FORM: mailto (Option B) with validation + accessible feedback ---
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('cf_feedback') || document.getElementById('cf_feedback'); // fallback
  const submitBtn = document.getElementById('cf_submit');

  // helper: show feedback
  function showFeedback(msg, ok = true) {
    const el = document.getElementById('cf_feedback');
    if (!el) return;
    el.hidden = false;
    el.textContent = msg;
    el.style.background = ok ? '#eef7ea' : '#fdecec';
    el.style.color = ok ? '#165218' : '#7a1f1f';
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cf_name').value.trim();
      const email = document.getElementById('cf_email').value.trim();
      const phone = document.getElementById('cf_phone').value.trim();
      const subject = document.getElementById('cf_subject').value.trim();
      const message = document.getElementById('cf_message').value.trim();

      // basic validation
      if (!name || !email || !subject || !message) {
        showFeedback('Veuillez remplir tous les champs obligatoires.', false);
        return;
      }
      // email pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showFeedback("L'adresse email n'est pas valide.", false);
        return;
      }

      // compose mailto
      const to = 'alexlejuste71@gmail.com';
      const subj = encodeURIComponent(subject + ' — ' + name);
      const body = encodeURIComponent(
        `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone || 'N/A'}\n\nMessage:\n${message}`
      );

      const mailto = `mailto:${to}?subject=${subj}&body=${body}`;

      // open mail client
      window.location.href = mailto;

      showFeedback('Votre client mail va s’ouvrir. Merci !', true);
    });
  }
});




// ================= MENU MOBILE =================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu-close");
  const nav = document.querySelector(".nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.add("active");
    menuClose.classList.add("active");
  });

  menuClose.addEventListener("click", () => {
    nav.classList.remove("active");
    menuClose.classList.remove("active");
  });

  // Fermer le menu au clic sur un lien
  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuClose.classList.remove("active");
    });
  });
});
