const nav = document.getElementById('mainNav');
const year = document.getElementById('year');
const form = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');
const formNext = document.getElementById('formNext');
const formUrl = document.getElementById('formUrl');
const submitButton = document.getElementById('quoteSubmit');
const submitLabel = submitButton?.querySelector('.submit-label');
const submitLoading = submitButton?.querySelector('.submit-loading');
const details = document.getElementById('details');
const detailsCount = document.getElementById('detailsCount');

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

const setFormReturnUrls = () => {
  if (!formNext || !formUrl || window.location.protocol === 'file:') return;

  const currentUrl = new URL(window.location.href);
  currentUrl.hash = '';
  currentUrl.search = '';
  formUrl.value = currentUrl.toString();

  currentUrl.searchParams.set('sent', '1');
  currentUrl.hash = 'quote';
  formNext.value = currentUrl.toString();
};

const showSentMessage = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('sent') !== '1' || !formStatus) return;

  formStatus.hidden = false;
  form?.reset();
  if (detailsCount) detailsCount.textContent = '0';

  // Remove ?sent=1 so refreshing the page does not show an old success message.
  if (window.history.replaceState) {
    const cleanUrl = `${window.location.pathname}${window.location.hash || '#quote'}`;
    window.history.replaceState({}, document.title, cleanUrl);
  }
};

const updateDetailsCount = () => {
  if (details && detailsCount) detailsCount.textContent = String(details.value.length);
};

details?.addEventListener('input', updateDetailsCount);
updateDetailsCount();
setFormReturnUrls();
showSentMessage();

form?.addEventListener('submit', (event) => {
  form.classList.add('was-validated');

  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    form.querySelector(':invalid')?.focus();
    return;
  }

  setFormReturnUrls();

  // FormSubmit needs a real http(s) page rather than a file opened directly.
  if (window.location.protocol === 'file:') {
    event.preventDefault();
    if (formStatus) {
      formStatus.hidden = false;
      formStatus.classList.add('form-status-error');
      formStatus.innerHTML = '<i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i><div><strong>Open the site through GitHub Pages to test the form.</strong><span>Form submission will not work from a local file:// page.</span></div>';
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  if (submitButton) submitButton.disabled = true;
  if (submitLabel) submitLabel.hidden = true;
  if (submitLoading) submitLoading.hidden = false;
});
