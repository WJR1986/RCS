const nav = document.getElementById('mainNav');
const year = document.getElementById('year');
const form = document.getElementById('quoteForm');

if (year) year.textContent = new Date().getFullYear();

const updateNav = () => {
  nav?.classList.toggle('nav-scrolled', window.scrollY > 18);
};
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

document.querySelectorAll('#navMenu .nav-link, #navMenu .btn').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu?.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  const name = document.getElementById('name').value.trim();
  const area = document.getElementById('area').value.trim();
  const service = document.getElementById('service').value;
  const details = document.getElementById('details').value.trim();

  const subject = `Free quote request - ${service}`;
  const body = [
    `Hi Richardson's Cleaning Services,`,
    '',
    `I'd like a free quote please.`,
    '',
    `Name: ${name}`,
    `Area / postcode: ${area}`,
    `Service: ${service}`,
    `Details: ${details || 'No extra details supplied.'}`,
    '',
    'Thanks'
  ].join('\n');

  window.location.href = `mailto:rcs.exteriorcleaning@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
