/* ============================================================
   inventory.js — Filter / sort / render
   ============================================================ */

(function () {
  'use strict';

  const ALL = 'all';

  const state = {
    make: ALL, tier: ALL, body: ALL, year: ALL,
    priceMin: 100000, priceMax: 700000,
    sort: 'featured',
  };

  const els = {};

  function populateSelect(el, options, withAll = true, allLabel = 'All') {
    const opts = [];
    if (withAll) opts.push(`<option value="${ALL}">${allLabel}</option>`);
    options.forEach(o => opts.push(`<option value="${o}">${o}</option>`));
    el.innerHTML = opts.join('');
  }

  function applyFilters() {
    let list = MM_VEHICLES.filter(v => {
      if (state.make !== ALL && v.make !== state.make) return false;
      if (state.tier !== ALL && v.tier !== state.tier) return false;
      if (state.body !== ALL && v.body !== state.body) return false;
      if (state.year !== ALL && String(v.year) !== state.year) return false;
      if (v.price < state.priceMin || v.price > state.priceMax) return false;
      return true;
    });
    if (state.sort === 'price-asc')  list = list.slice().sort((a, b) => a.price - b.price);
    else if (state.sort === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price);
    else if (state.sort === 'year-desc')  list = list.slice().sort((a, b) => b.year - a.year);
    return list;
  }

  function render() {
    const list = applyFilters();
    els.grid.innerHTML = list.map(MM.vehicleCardHTML).join('');
    els.count.textContent = list.length;
    els.countTop.textContent = list.length;
    els.noResults.hidden = list.length !== 0;
    els.grid.hidden = list.length === 0;
  }

  function updatePriceUI() {
    const min = parseInt(els.pmin.value, 10);
    const max = parseInt(els.pmax.value, 10);
    const range = 700000 - 100000;
    const left = ((min - 100000) / range) * 100;
    const right = ((max - 100000) / range) * 100;
    els.fill.style.left = left + '%';
    els.fill.style.width = (right - left) + '%';
    els.priceLabel.textContent = `Price · ${MM.formatPriceShort(min)} — ${MM.formatPriceShort(max)}`;
  }

  function bind() {
    els.make.addEventListener('change', e => { state.make = e.target.value; render(); });
    els.tier.addEventListener('change', e => { state.tier = e.target.value; render(); });
    els.body.addEventListener('change', e => { state.body = e.target.value; render(); });
    els.year.addEventListener('change', e => { state.year = e.target.value; render(); });
    els.sort.addEventListener('change', e => { state.sort = e.target.value; render(); });

    const onPriceInput = (e) => {
      let min = parseInt(els.pmin.value, 10);
      let max = parseInt(els.pmax.value, 10);
      // ensure min <= max with 5k gap
      if (min > max - 5000) {
        if (e.target === els.pmin) { min = max - 5000; els.pmin.value = min; }
        else { max = min + 5000; els.pmax.value = max; }
      }
      state.priceMin = min;
      state.priceMax = max;
      updatePriceUI();
      render();
    };
    els.pmin.addEventListener('input', onPriceInput);
    els.pmax.addEventListener('input', onPriceInput);

    const reset = () => {
      state.make = ALL; state.tier = ALL; state.body = ALL; state.year = ALL;
      state.priceMin = 100000; state.priceMax = 700000; state.sort = 'featured';
      els.make.value = ALL; els.tier.value = ALL; els.body.value = ALL; els.year.value = ALL;
      els.pmin.value = 100000; els.pmax.value = 700000; els.sort.value = 'featured';
      updatePriceUI();
      render();
    };
    document.getElementById('btn-reset').addEventListener('click', reset);
    document.getElementById('btn-reset-2').addEventListener('click', reset);
  }

  function init() {
    els.make = document.getElementById('f-make');
    els.tier = document.getElementById('f-tier');
    els.body = document.getElementById('f-body');
    els.year = document.getElementById('f-year');
    els.sort = document.getElementById('f-sort');
    els.pmin = document.getElementById('f-price-min');
    els.pmax = document.getElementById('f-price-max');
    els.fill = document.getElementById('range-fill');
    els.priceLabel = document.getElementById('price-label');
    els.grid = document.getElementById('grid');
    els.count = document.getElementById('result-count');
    els.countTop = document.getElementById('result-count-top');
    els.noResults = document.getElementById('no-results');

    populateSelect(els.make, MM_MAKES,  true, 'All marques');
    populateSelect(els.tier, MM_TIERS,  true, 'All tiers');
    populateSelect(els.body, MM_BODIES, true, 'All bodies');
    populateSelect(els.year, MM_YEARS,  true, 'All years');

    updatePriceUI();
    bind();
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
