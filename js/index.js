/* ============================================================
   index.js — Home page logic
   - Featured grid render
   - Marquee brands
   - Hero featured card
   ============================================================ */

(function () {
  'use strict';

  const BRANDS = [
    'Porsche', 'Ferrari', 'Lamborghini', 'Rolls-Royce', 'Bentley',
    'Mercedes-AMG', 'Aston Martin', 'McLaren', 'BMW M', 'Audi RS',
  ];

  function renderFeatured() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;
    const featured = MM_VEHICLES.filter(v => v.featured).slice(0, 4);
    grid.innerHTML = featured.map(MM.vehicleCardHTML).join('');
  }

  function renderMarquee() {
    const track = document.getElementById('marquee-track');
    if (!track) return;
    const items = [...BRANDS, ...BRANDS]; // duplicated for seamless loop
    track.innerHTML = items
      .map(b => `<span>${b}<span class="sep">·</span></span>`)
      .join('');
  }

  function renderHeroCard() {
    const card = document.getElementById('hero-card');
    if (!card) return;
    const v = MM_GET('mm-002') || MM_VEHICLES[1];
    card.innerHTML = `
      <div>
        <p class="ovl">Featured · ${v.year}</p>
        <p class="name">${v.make} ${v.model}</p>
      </div>
      <a href="vehicle.html?id=${v.id}" aria-label="View ${v.model}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </a>
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    renderMarquee();
    renderHeroCard();
  });
})();
