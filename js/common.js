/* ============================================================
   MAISON MOTORS — common.js
   Shared: header inject, footer inject, mobile menu, toasts,
           scroll state, helpers
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Helpers exposed globally ---------- */
  window.MM = window.MM || {};

  MM.formatPrice = function (n) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0,
    }).format(n);
  };

  MM.formatPriceShort = function (n) {
    return '$' + Math.round(n / 1000) + 'k';
  };

  MM.qs = (sel, root = document) => root.querySelector(sel);
  MM.qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  MM.params = function () {
    const p = {};
    new URLSearchParams(location.search).forEach((v, k) => { p[k] = v; });
    return p;
  };

  /* ---------- Toasts ---------- */
  function ensureToastRoot() {
    let root = document.getElementById('mm-toasts');
    if (!root) {
      root = document.createElement('div');
      root.id = 'mm-toasts';
      root.className = 'toasts';
      document.body.appendChild(root);
    }
    return root;
  }

  MM.toast = function (message, type = 'success', duration = 3500) {
    const root = ensureToastRoot();
    const el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' error' : '');
    el.innerHTML = '<span class="dot"></span><span>' + message + '</span>';
    root.appendChild(el);
    setTimeout(() => {
      el.classList.add('leaving');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, duration);
  };

  /* ---------- Header & Footer injection ---------- */
  const NAV_LINKS = [
    { href: 'index.html',     id: 'home',       label: 'Home' },
    { href: 'inventory.html', id: 'collection', label: 'Collection' },
    { href: 'financing.html', id: 'financing',  label: 'Financing' },
    { href: 'test-drive.html',id: 'test-drive', label: 'Test Drive' },
    { href: 'about.html',     id: 'atelier',    label: 'Atelier' },
  ];

  function currentPageId() {
    const path = location.pathname.split('/').pop().toLowerCase();
    if (!path || path === '' || path === 'index.html') return 'home';
    if (path.startsWith('inventory') || path.startsWith('vehicle')) return 'collection';
    if (path.startsWith('financing')) return 'financing';
    if (path.startsWith('test-drive')) return 'test-drive';
    if (path.startsWith('about')) return 'atelier';
    return '';
  }

  function injectHeader() {
    const host = document.getElementById('site-header');
    if (!host) return;
    const active = currentPageId();

    const desktopLinks = NAV_LINKS.map(l =>
      `<a href="${l.href}" class="${active === l.id ? 'active' : ''}">${l.label}</a>`
    ).join('');

    const mobileLinks = NAV_LINKS.map(l =>
      `<a href="${l.href}" class="${active === l.id ? 'active' : ''}">${l.label}</a>`
    ).join('');

    host.outerHTML = `
      <header class="site-header" data-testid="site-header">
        <div class="header-inner">
          <a href="index.html" class="brand" data-testid="brand-logo">Your<span class="dot">.</span>Car Dealership</a>
          <nav class="nav">${desktopLinks}</nav>
          <div class="header-actions">
            <a href="test-drive.html" class="header-cta">Reserve Test Drive</a>
            <button class="menu-toggle" id="menu-toggle" aria-label="Open menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
        <div class="mobile-drawer" id="mobile-drawer">
          <nav class="nav-mobile">${mobileLinks}</nav>
        </div>
      </header>
    `;

    const header = MM.qs('.site-header');
    const drawer = MM.qs('#mobile-drawer');
    const toggle = MM.qs('#menu-toggle');

    toggle.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function injectFooter() {
    const host = document.getElementById('site-footer');
    if (!host) return;
    const year = new Date().getFullYear();
    host.outerHTML = `
      <footer class="site-footer" data-testid="site-footer">
        <div class="footer-grid">
          <div class="footer-brand">
            <p class="overline">Maison Motors — Est. 1998</p>
            <h3>The art <span class="italic-em">of</span><br>extraordinary motoring.</h3>
            <p>A private collection of the world's most desired automobiles — curated, certified, and delivered with quiet excellence.</p>
            <div class="socials">
              <a href="#" class="social" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" class="social" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="mailto:concierge@maisonmotors.com" class="social" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
            </div>
          </div>
          <div class="footer-col">
            <p class="label">Explore</p>
            <ul>
              <li><a href="inventory.html">Collection</a></li>
              <li><a href="financing.html">Financing</a></li>
              <li><a href="test-drive.html">Test Drive</a></li>
              <li><a href="about.html">Atelier</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <p class="label">Showroom</p>
            <ul>
              <li>14 Beverly Drive</li>
              <li>Beverly Hills, CA 90210</li>
              <li>Mon — Sat · 9 to 19</li>
              <li>Sun · By appointment</li>
            </ul>
          </div>
          <div class="footer-col footer-concierge">
            <p class="label">Concierge</p>
            <p class="number">+1 (310) 555 0144</p>
            <p class="email">concierge@maisonmotors.com</p>
            <p class="note">Available 24/7 to our private clients.</p>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="inner">
            <p>© ${year} Maison Motors. All rights reserved.</p>
            <p class="upper">Crafted with intention</p>
          </div>
        </div>
      </footer>
    `;
  }

  /* ---------- Vehicle card (shared renderer) ---------- */
  MM.vehicleCardHTML = function (v) {
    return `
      <a href="vehicle.html?id=${v.id}" class="v-card" data-testid="vehicle-card-${v.id}">
        <div class="img-wrap">
          <img src="${v.images[0]}" alt="${v.make} ${v.model}" loading="lazy" />
          <span class="tier-tag">${v.tier}</span>
        </div>
        <div class="body">
          <div class="top-row">
            <div>
              <p class="overline">${v.make}</p>
              <h3 class="name">${v.model}</h3>
            </div>
            <span class="arrow-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </span>
          </div>
          <div class="meta">
            <span>${v.year}</span><span>·</span>
            <span>${v.mileage.toLocaleString()} mi</span><span>·</span>
            <span>${v.fuel}</span>
          </div>
          <div class="price-row">
            <span class="from">From</span>
            <span class="price">${MM.formatPrice(v.price)}</span>
          </div>
        </div>
      </a>
    `;
  };

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
  });
})();
