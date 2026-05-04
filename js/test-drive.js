/* ============================================================
   test-drive.js — Form validation + success state
   ============================================================ */

(function () {
  'use strict';

  const els = {};

  function populateVehicleSelect(selectedId) {
    els.vehicle.innerHTML = MM_VEHICLES
      .map(v => `<option value="${v.id}">${v.year} ${v.make} ${v.model}</option>`)
      .join('');
    if (selectedId && MM_GET(selectedId)) {
      els.vehicle.value = selectedId;
    }
  }

  function updatePreview() {
    const v = MM_GET(els.vehicle.value);
    if (!v) return;
    els.image.src = v.images[0];
    els.image.alt = `${v.make} ${v.model}`;
    els.selected.textContent = `${v.year} ${v.make} ${v.model}`;
  }

  function setMinDateToToday() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    els.date.min = `${yyyy}-${mm}-${dd}`;
  }

  function validateEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }

  function onSubmit(e) {
    e.preventDefault();
    const name  = els.name.value.trim();
    const email = els.email.value.trim();
    const phone = els.phone.value.trim();
    const date  = els.date.value;
    const time  = els.time.value;

    if (!name || !email || !phone || !date || !time) {
      MM.toast('Please complete all required fields.', 'error');
      return;
    }
    if (!validateEmail(email)) {
      MM.toast('Please enter a valid email address.', 'error');
      return;
    }

    // success
    const v = MM_GET(els.vehicle.value);
    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    document.getElementById('td-success-text').textContent =
      `We've received your request for the ${v.year} ${v.make} ${v.model} on ${formattedDate} at ${time}. ` +
      `A member of our concierge team will reach out within the hour to confirm details.`;

    document.getElementById('td-form-view').hidden = true;
    const success = document.getElementById('td-success-view');
    success.hidden = false;
    success.classList.add('fade-up');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    MM.toast('Reservation confirmed. Our concierge will be in touch shortly.');
  }

  function reset() {
    els.name.value = ''; els.email.value = ''; els.phone.value = '';
    els.date.value = ''; els.time.value = ''; els.notes.value = '';
    document.getElementById('td-success-view').hidden = true;
    document.getElementById('td-form-view').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function init() {
    els.vehicle = document.getElementById('td-vehicle');
    els.image   = document.getElementById('td-image');
    els.selected = document.getElementById('td-selected');
    els.name = document.getElementById('td-name');
    els.email = document.getElementById('td-email');
    els.phone = document.getElementById('td-phone');
    els.date = document.getElementById('td-date');
    els.time = document.getElementById('td-time');
    els.notes = document.getElementById('td-notes');

    const preselectId = MM.params().vehicleId;
    populateVehicleSelect(preselectId);
    updatePreview();
    setMinDateToToday();

    els.vehicle.addEventListener('change', updatePreview);
    document.getElementById('td-form').addEventListener('submit', onSubmit);
    document.getElementById('btn-another').addEventListener('click', reset);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
