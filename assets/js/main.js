const header = document.querySelector('[data-header]');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}

const page = document.body.dataset.page;
document.querySelectorAll('.site-nav a[data-page-link]').forEach((link) => {
  if (link.dataset.pageLink === page) link.classList.add('active');
});

const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  reveals.forEach((element) => {
    element.setAttribute('data-reveal-ready', 'true');
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      element.classList.add('visible');
    }
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((element) => io.observe(element));
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form instanceof HTMLFormElement) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const btn = form.querySelector('.form-submit');
    if (btn instanceof HTMLButtonElement) {
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(`Collaboration - ${data.get('sujet') || 'Message via portfolio'}`);
    const body = encodeURIComponent(
      `Nom: ${data.get('nom')}\nEmail: ${data.get('email')}\nTelephone: ${data.get('telephone') || 'Non renseigne'}\nType de projet: ${data.get('projet') || 'Non renseigne'}\n\nMessage:\n${data.get('message')}`
    );

    window.location.href = `mailto:synnovatocloe@gmail.com?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      form.style.display = 'none';
      formSuccess?.classList.add('active');
    }, 700);
  });
}
