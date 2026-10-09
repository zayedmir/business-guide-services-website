/* ===================================================================
   script.js — everything interactive on the site.
   Loaded at the bottom of both index.html and group.html.
   Edit the contact details in section 1 and the whole site follows.
   =================================================================== */

/* ---------- 1. Company details (was src/data/company.ts) ---------- */
const COMPANY = {
  name: 'Business Guide Services',
  established: 2006,
  licenseNo: '579304',
  legalForm: 'Civil Company',
  authority: 'Department of Economy and Tourism (DET)',
  phone: '971544761111',            // digits only, used by wa.me and tel:
  phoneDisplay: '+971 54 476 1111',
  email: 'info@dubaibgs.ae',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Radiance+One+Business+Center+Riggat+Al+Buteen+Deira+Dubai',
  address: ['Office 235, Radiance One Business Center', 'Riggat Al Buteen, Deira', 'Dubai, United Arab Emirates'],
  landmark: 'Beside Al Reem Tower',
  hours: [
    ['Monday – Thursday', '8:00 – 18:00'],
    ['Friday', '8:00 – 12:00 · 14:00 – 20:00'],
    ['Saturday', '8:00 – 18:00'],
    ['Sunday', 'By appointment only'],
  ],
};
const DEFAULT_MSG = `Hello ${COMPANY.name}, I would like help with a UAE government transaction.`;
const waLink = (msg) => `https://wa.me/${COMPANY.phone}?text=${encodeURIComponent(msg)}`;

/* ---------- 2. Shared header + footer ----------
   Both pages have <header id="site-header"> and <footer id="site-footer">
   as empty placeholders; we fill them here so they're written ONCE.
   Links use "index.html#..." so they work from any page and on GitHub Pages. */
const links = [
  ['Services', 'index.html#services'],
  ['How it works', 'index.html#process'],
  ['The firm', 'index.html#firm'],
  ['Group', 'group.html'],
  ['Contact', 'index.html#contact'],
];

const header = document.getElementById('site-header');
if (header) {
  header.className = 'site-header';
  header.innerHTML = `
    <div class="wrap bar">
      <a class="brand" href="index.html" aria-label="${COMPANY.name}">
        <img src="img/logo-mark.png" alt="${COMPANY.name} logo" width="40" height="40">
        <span><b>${COMPANY.name}</b><small>Est. ${COMPANY.established} · Dubai</small></span>
      </a>
      <nav class="main-nav" id="nav">
        ${links.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}
        <a class="btn" href="${waLink(DEFAULT_MSG)}" target="_blank" rel="noopener">Contact us</a>
      </nav>
      <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-label="Toggle navigation">Menu</button>
    </div>`;

  const nav = document.getElementById('nav');
  const btn = document.getElementById('menuBtn');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) nav.classList.remove('open'); });

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

const footer = document.getElementById('site-footer');
if (footer) {
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <div class="foot-brand">
            <img src="img/logo-on-dark.png" alt="${COMPANY.name} logo" loading="lazy">
            <b>${COMPANY.name}</b>
          </div>
          <p>A Dubai typing centre and documents clearing firm since ${COMPANY.established}. Licensed by the ${COMPANY.authority} and a registered trademark agent.</p>
          <p class="arabic" dir="rtl" lang="ar">خدمات تخليص المستندات والمعاملات الحكومية في دبي</p>
        </div>
        <div>
          <h3>Navigate</h3>
          <ul>${links.map(([t, h]) => `<li><a href="${h}">${t === 'Group' ? 'Group ventures' : t}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h3>Contact us</h3>
          <ul>
            <li><a href="tel:+${COMPANY.phone}">${COMPANY.phoneDisplay}</a></li>
            <li><a href="mailto:${COMPANY.email}">${COMPANY.email}</a></li>
            <li><a href="${COMPANY.mapsUrl}" target="_blank" rel="noopener">${COMPANY.address.join('<br>')}<br><small>${COMPANY.landmark}</small></a></li>
          </ul>
          <h3 style="margin-top:2rem">Office hours</h3>
          <dl class="hours">${COMPANY.hours.map(([d, t]) => `<div><dt>${d}</dt><dd>${t}</dd></div>`).join('')}</dl>
        </div>
      </div>
      <div class="foot-base">
        <p style="margin:0;max-width:none">© ${COMPANY.established}–${new Date().getFullYear()} ${COMPANY.name} · Licence no. ${COMPANY.licenseNo} · ${COMPANY.legalForm}</p>
        <a href="group.html">Explore our other ventures ↗</a>
      </div>
    </div>`;
}

/* ---------- 3. WhatsApp buttons ----------
   Any <a data-wa="message"> gets a wa.me link built for it.
   An empty data-wa="" uses the default message. */
document.querySelectorAll('[data-wa]').forEach((a) => {
  a.href = waLink(a.dataset.wa || DEFAULT_MSG);
  a.target = '_blank';
  a.rel = 'noopener';
});

/* ---------- 4. Scroll reveal (IntersectionObserver) ---------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-in'));
}

/* ---------- 5. Marquee: duplicate the list so the loop is seamless ---------- */
const track = document.querySelector('.marquee-track');
if (track) track.innerHTML += track.innerHTML;

/* ---------- 6. Contact form ----------
   GitHub Pages has no backend, so the form can't "save" anything.
   Instead it builds the message from the fields and hands it to
   WhatsApp (submit) or the visitor's email app (second button). */
const form = document.getElementById('enquiry');
if (form) {
  const buildMessage = () => {
    const d = Object.fromEntries(new FormData(form));
    return [
      DEFAULT_MSG,
      d.name && `Name: ${d.name}`,
      d.phone && `Phone: ${d.phone}`,
      d.email && `Email: ${d.email}`,
      d.service && `Service: ${d.service}`,
      d.message && `Details: ${d.message}`,
    ].filter(Boolean).join('\n');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the page reloading
    window.open(waLink(buildMessage()), '_blank', 'noopener');
  });

  document.getElementById('mailBtn').addEventListener('click', () => {
    if (!form.reportValidity()) return; // respects the "required" fields
    location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent('New website enquiry')}&body=${encodeURIComponent(buildMessage())}`;
  });
}
