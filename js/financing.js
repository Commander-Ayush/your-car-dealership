/* ============================================================
   financing.js — Live PMT calculator
   ============================================================ */

(function () {
  'use strict';

  const state = { price: 250000, down: 50000, term: 60, rate: 4.9 };
  const els = {};

  function setRangeFill(input) {
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const val = parseFloat(input.value);
    const pct = ((val - min) / (max - min)) * 100;
    input.style.setProperty('--p', pct + '%');
  }

  function compute() {
    const P = Math.max(0, state.price - state.down);
    const r = (state.rate / 100) / 12;
    const n = state.term;
    let monthly, totalInterest;
    if (P <= 0) {
      monthly = 0; totalInterest = 0;
    } else if (r === 0) {
      monthly = P / n; totalInterest = 0;
    } else {
      monthly = (P * r) / (1 - Math.pow(1 + r, -n));
      totalInterest = (monthly * n) - P;
    }
    const totalCost = (monthly * n) + state.down;
    return { monthly, totalInterest, totalCost, financed: P };
  }

  function render() {
    els.lblPrice.textContent = MM.formatPrice(state.price);
    const downPct = state.price > 0 ? Math.round((state.down / state.price) * 100) : 0;
    els.lblDown.textContent = `${MM.formatPrice(state.down)} · ${downPct}%`;
    els.lblDownMax.textContent = MM.formatPrice(state.price);
    els.lblTerm.textContent = `${state.term} months · ${(state.term / 12).toFixed(0)} yrs`;
    els.lblRate.textContent = `${state.rate.toFixed(2)}%`;

    const c = compute();
    els.monthly.textContent  = MM.formatPrice(c.monthly);
    els.financed.textContent = MM.formatPrice(c.financed);
    els.interest.textContent = MM.formatPrice(c.totalInterest);
    els.total.textContent    = MM.formatPrice(c.totalCost);

    [els.rPrice, els.rDown, els.rTerm, els.rRate].forEach(setRangeFill);
  }

  function bind() {
    els.rPrice.addEventListener('input', e => {
      state.price = parseFloat(e.target.value);
      // clamp down to price; also adjust max of down slider
      els.rDown.max = String(state.price);
      if (state.down > state.price) {
        state.down = state.price;
        els.rDown.value = state.down;
      }
      render();
    });
    els.rDown.addEventListener('input', e => {
      state.down = parseFloat(e.target.value);
      render();
    });
    els.rTerm.addEventListener('input', e => {
      state.term = parseInt(e.target.value, 10);
      render();
    });
    els.rRate.addEventListener('input', e => {
      state.rate = parseFloat(e.target.value);
      render();
    });
  }

  function init() {
    els.rPrice = document.getElementById('r-price');
    els.rDown  = document.getElementById('r-down');
    els.rTerm  = document.getElementById('r-term');
    els.rRate  = document.getElementById('r-rate');
    els.lblPrice = document.getElementById('lbl-price');
    els.lblDown  = document.getElementById('lbl-down');
    els.lblDownMax = document.getElementById('lbl-down-max');
    els.lblTerm  = document.getElementById('lbl-term');
    els.lblRate  = document.getElementById('lbl-rate');
    els.monthly  = document.getElementById('fin-monthly');
    els.financed = document.getElementById('fin-financed');
    els.interest = document.getElementById('fin-interest');
    els.total    = document.getElementById('fin-total');

    // pre-fill from URL ?price=
    const urlPrice = parseFloat(MM.params().price);
    if (!isNaN(urlPrice) && urlPrice >= 50000 && urlPrice <= 700000) {
      state.price = urlPrice;
      state.down = Math.round(urlPrice * 0.2);
      els.rPrice.value = state.price;
      els.rDown.max = String(state.price);
      els.rDown.value = state.down;
    } else {
      els.rDown.max = String(state.price);
    }

    bind();
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
