// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ===== PRODUCT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        // Animate in
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== SCROLL REVEAL (fade-up) =====
const fadeEls = document.querySelectorAll(
  '.about-card, .product-card, .feature-item, .testi-card, .contact-item, .section-header, .hero-stats .stat'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ===== CONTACT FORM → WHATSAPP =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

const WHATSAPP_NUMBER = '918306543264'; // Country code + number (no + or spaces)

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');

  // Collect form values
  const name     = document.getElementById('name').value.trim();
  const phone    = document.getElementById('phone').value.trim();
  const email    = document.getElementById('email').value.trim();
  const interest = document.getElementById('interest').value;
  const message  = document.getElementById('message').value.trim();

  // Build WhatsApp message
  const text = [
    '🔵 *New Enquiry from FlowGem Website*',
    '',
    `👤 *Name:* ${name}`,
    `📞 *Phone:* ${phone}`,
    email    ? `📧 *Email:* ${email}`       : null,
    interest ? `🚿 *Interested In:* ${interest}` : null,
    message  ? `💬 *Message:* ${message}`   : null,
  ]
  .filter(line => line !== null)
  .join('\n');

  const encodedText = encodeURIComponent(text);
  const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

  // Show sending state briefly, then open WhatsApp
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-brands fa-whatsapp fa-spin"></i> Opening WhatsApp...';

  setTimeout(() => {
    window.open(waURL, '_blank');

    // Show success message
    btn.style.display = 'none';
    formSuccess.classList.add('show');
    contactForm.reset();

    // Reset button after 6 seconds
    setTimeout(() => {
      btn.style.display = '';
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Enquiry';
      formSuccess.classList.remove('show');
    }, 6000);
  }, 800);
});

// ===== SMOOTH ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--primary)';
    }
  });
});

// ===== COUNTER ANIMATION (hero stats) =====
function animateCounter(el, target, duration = 1600) {
  const start = 0;
  const step = (timestamp) => {
    if (!el._startTime) el._startTime = timestamp;
    const progress = Math.min((timestamp - el._startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + (el.dataset.suffix || '');
  };
  requestAnimationFrame(step);
}

// Observe stats and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const strongs = entry.target.querySelectorAll('.stat strong');
      strongs.forEach(strong => {
        const raw = strong.textContent;
        const num = parseInt(raw.replace(/\D/g, ''));
        const suffix = raw.replace(/[\d]/g, '');
        strong.dataset.suffix = suffix;
        animateCounter(strong, num, 1800);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
