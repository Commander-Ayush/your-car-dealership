/* ============================================================
   about.js — Contact form
   ============================================================ */

(function () {
  'use strict';

  function validateEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }

  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const msg = document.getElementById('c-message').value.trim();

      if (!name || !email || !msg) {
        MM.toast('Please complete all fields.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        MM.toast('Please enter a valid email address.', 'error');
        return;
      }
      MM.toast('Message received. We will reply within the hour.');
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
