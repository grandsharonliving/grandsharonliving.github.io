/* ==============================
   KONFIGURASI YANG WAJIB DIGANTI
   ============================== */
const CONFIG = {
  whatsappNumber: '6281234567890', // format internasional tanpa tanda +
  projectName: 'Grand Sharon Residence',
  defaultMessage: 'Halo, saya tertarik dengan Grand Sharon Residence. Mohon kirimkan pricelist dan promo terbaru.'
};

const params = new URLSearchParams(window.location.search);
const tracking = {
  utm_source: params.get('utm_source') || '',
  utm_medium: params.get('utm_medium') || '',
  utm_campaign: params.get('utm_campaign') || '',
  utm_content: params.get('utm_content') || '',
  gclid: params.get('gclid') || '',
  fbclid: params.get('fbclid') || ''
};

function encodeMessage(form) {
  const data = new FormData(form);
  const parts = [
    `Halo, saya tertarik dengan ${CONFIG.projectName}.`,
    '',
    `Nama: ${data.get('name') || '-'}`,
    `Nomor WA: ${data.get('phone') || '-'}`,
    `Email: ${data.get('email') || '-'}`,
    '',
    'Saya ingin mendapatkan pricelist, promo terbaru, simulasi KPR, dan informasi survey lokasi.'
  ];
  if (tracking.utm_source) parts.push('', `Sumber: ${tracking.utm_source} / ${tracking.utm_campaign || '-'}`);
  return encodeURIComponent(parts.join('\n'));
}

function fireTrackingEvents() {
  // Google Analytics / Google Ads (aktif jika gtag sudah dipasang)
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', { event_category: 'lead', event_label: 'whatsapp_form' });
  }
  // Meta Pixel (aktif jika fbq sudah dipasang)
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
}

function submitLead(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) return form.reportValidity();
  fireTrackingEvents();
  showToast('Membuka WhatsApp…');
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeMessage(form)}`;
  setTimeout(() => window.open(url, '_blank', 'noopener'), 250);
}

document.querySelectorAll('[data-lead-form]').forEach(form => form.addEventListener('submit', submitLead));

const defaultWa = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.defaultMessage)}`;
['floatingWa','mobileWa'].forEach(id => { const el = document.getElementById(id); if (el) el.href = defaultWa; });

document.getElementById('year').textContent = new Date().getFullYear();

// Gallery modal
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
document.querySelectorAll('[data-gallery]').forEach(btn => btn.addEventListener('click', () => {
  modalImg.src = btn.dataset.gallery;
  modal.showModal();
}));
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

// Reveal animation
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
