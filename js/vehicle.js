/* ============================================================
   vehicle.js — Detail page (gallery, specs, related)
   ============================================================ */

(function () {
  'use strict';

  function renderNotFound() {
    document.getElementById('notfound').hidden = false;
    document.querySelector('.vehicle-hero').hidden = true;
    document.querySelector('.specs-section').hidden = true;
    document.title = 'Not found — Maison Motors';
  }

  function renderVehicle(v) {
    document.title = `${v.year} ${v.make} ${v.model} — Maison Motors`;

    const mainImg = document.getElementById('main-img');
    const tierTag = document.getElementById('tier-tag');
    const thumbs = document.getElementById('thumbs');

    mainImg.src = v.images[0];
    mainImg.alt = `${v.make} ${v.model}`;
    tierTag.textContent = v.tier;

    if (v.images.length > 1) {
      thumbs.innerHTML = v.images.map((src, i) =>
        `<button class="thumb${i === 0 ? ' active' : ''}" data-i="${i}">
           <img src="${src}" alt="" />
         </button>`
      ).join('');
      thumbs.addEventListener('click', e => {
        const btn = e.target.closest('.thumb');
        if (!btn) return;
        const i = parseInt(btn.dataset.i, 10);
        mainImg.src = v.images[i];
        thumbs.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
      });
    } else {
      thumbs.style.display = 'none';
    }

    document.getElementById('v-meta-line').textContent = `${v.year} · ${v.make}`;
    document.getElementById('v-model').textContent = v.model;
    document.getElementById('v-price').textContent = MM.formatPrice(v.price);
    document.getElementById('v-desc').textContent = v.description;

    document.getElementById('cta-test').href = `test-drive.html?vehicleId=${v.id}`;
    document.getElementById('cta-finance').href = `financing.html?price=${v.price}`;

    // SPECS
    const specs = [
      ['Horsepower',   `${v.horsepower} hp`],
      ['0 — 60 mph',   `${v.zeroToSixty}s`],
      ['Top speed',    `${v.topSpeed} mph`],
      ['Transmission', v.transmission],
      ['Fuel',         v.fuel],
      ['Mileage',      `${v.mileage.toLocaleString()} mi`],
    ];
    document.getElementById('specs-grid').innerHTML = specs
      .map(([k, val]) => `<div class="spec-cell"><p class="k">${k}</p><p class="v">${val}</p></div>`)
      .join('');

    // RELATED
    const related = MM_VEHICLES
      .filter(o => o.id !== v.id && (o.tier === v.tier || o.make === v.make))
      .slice(0, 3);
    if (related.length) {
      document.getElementById('related-section').hidden = false;
      document.getElementById('related-grid').innerHTML = related.map(MM.vehicleCardHTML).join('');
    }
  }

  function init() {
    const id = MM.params().id;
    const v = id ? MM_GET(id) : null;
    if (!v) { renderNotFound(); return; }
    renderVehicle(v);

    document.getElementById('btn-back').addEventListener('click', () => {
      if (document.referrer && document.referrer.indexOf(location.host) !== -1) {
        history.back();
      } else {
        location.href = 'inventory.html';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
