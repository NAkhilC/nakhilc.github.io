// Year stamp
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// ---- Hero console faders ----
const faders = document.querySelectorAll('.fader-track input[type="range"]');
const masterVal = document.getElementById('master-val');
const masterFill = document.getElementById('master-fill');

function updateConsole() {
  if (!faders.length) return;
  let total = 0;
  faders.forEach(f => {
    const readout = document.querySelector(`[data-readout="${f.dataset.channel}"]`);
    if (readout) readout.textContent = f.value + '%';
    total += Number(f.value);
  });
  const avg = Math.round(total / faders.length);
  if (masterVal) masterVal.textContent = avg + '%';
  if (masterFill) masterFill.style.width = avg + '%';
}
faders.forEach(f => f.addEventListener('input', updateConsole));
updateConsole();

// ---- Mobile nav toggle ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '72px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = '#15181C';
    navLinks.style.padding = '20px var(--edge)';
    navLinks.style.borderBottom = '1px solid #2B2F35';
    navLinks.style.gap = '18px';
  });
}

// ---- FAQ accordion ----
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.faq-item').classList.toggle('open');
  });
});

// ---- Chip select (project type) ----
document.querySelectorAll('.chip input').forEach(input => {
  input.addEventListener('change', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
    input.closest('.chip').classList.add('is-active');
  });
});

// ---- Contact form (front-end only: opens mail client) ----
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const company = form.company.value.trim();
    const type = (form.querySelector('input[name="project-type"]:checked') || {}).value || 'not specified';
    const budget = form.budget.value || 'not specified';
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`New project inquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'n/a'}\nProject type: ${type}\nBudget: ${budget}\n\nDetails:\n${message}`
    );
    window.location.href = `mailto:hello@techslider.com?subject=${subject}&body=${body}`;

    const success = document.getElementById('form-success');
    if (success) success.classList.add('show');
  });
}
