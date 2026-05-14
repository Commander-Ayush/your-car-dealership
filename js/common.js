/* ============================================================
   AUTO ELITE — common.js
   Shared: header, footer, toasts, helpers
   ============================================================ */

(function () {
  'use strict';

  window.MM = window.MM || {};

  /* ── Price formatting (INR) ─────────────────────────────── */
  MM.formatPrice = function (n) {
    if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
    if (n >= 100000)   return '₹' + (n / 100000).toFixed(2) + ' L';
    return '₹' + n.toLocaleString('en-IN');
  };

  MM.formatPriceShort = function (n) {
    if (n >= 10000000) return '₹' + (n / 10000000).toFixed(1) + 'Cr';
    if (n >= 100000)   return '₹' + (n / 100000).toFixed(0) + 'L';
    return '₹' + Math.round(n / 1000) + 'k';
  };

  MM.qs = (sel, root = document) => root.querySelector(sel);
  MM.qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  MM.params = function () {
    const p = {};
    new URLSearchParams(location.search).forEach((v, k) => { p[k] = v; });
    return p;
  };

  /* ── Toasts ─────────────────────────────────────────────── */
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

  /* ── Nav links ──────────────────────────────────────────── */
  const NAV_LINKS = [
    { href: 'index.html',      id: 'home',       label: 'Home' },
    { href: 'inventory.html',  id: 'collection', label: 'Inventory' },
    { href: 'financing.html',  id: 'financing',  label: 'EMI Calculator' },
    { href: 'test-drive.html', id: 'test-drive', label: 'Test Drive' },
    { href: 'about.html',      id: 'about',      label: 'About Us' },
  ];

  function currentPageId() {
    const path = location.pathname.split('/').pop().toLowerCase();
    if (!path || path === '' || path === 'index.html') return 'home';
    if (path.startsWith('inventory') || path.startsWith('vehicle')) return 'collection';
    if (path.startsWith('financing')) return 'financing';
    if (path.startsWith('test-drive')) return 'test-drive';
    if (path.startsWith('about')) return 'about';
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
          <a href="index.html" class="brand" data-testid="brand-logo">
            Auto<span class="dot"> Elite</span>
            <span class="brand-tag">Certified Pre-Owned</span>
          </a>
          <nav class="nav">${desktopLinks}</nav>
          <div class="header-actions">
            <a href="test-drive.html" class="header-cta">Book Test Drive</a>
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
            <p class="overline">Auto Elite · Est. 2010</p>
            <h3>Delhi's most <span class="italic-em">trusted</span><br>used car destination.</h3>
            <p>Every vehicle inspected at 150+ checkpoints, backed by a 6-month warranty and transparent pricing. No surprises — ever.</p>
            <div class="socials">
              <a href="#" class="social" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" class="social" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
              <a href="https://wa.me/919876543210" class="social" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></a>
            </div>
          </div>
          <div class="footer-col">
            <p class="label">Explore</p>
            <ul>
              <li><a href="inventory.html">Our Inventory</a></li>
              <li><a href="financing.html">EMI Calculator</a></li>
              <li><a href="test-drive.html">Book Test Drive</a></li>
              <li><a href="about.html">About Us</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <p class="label">Showroom</p>
            <ul>
              <li>Block B, Building No. B63</li>
              <li>Opposite To Maa Vaishno Devi Mandir</li>
              <li>Lajpat Nagar 1, Lajpat Nagar</li>
              <li>Delhi NCR — 121 003</li>
              <li>Mon — Sat · 10:00 to 19:30</li>
            </ul>
          </div>
          <div class="footer-col footer-concierge">
            <p class="label">Talk to Us</p>
            <p class="number">+91 9711044227</p>
            <p class="email">info@autoelite.in</p>
            <p class="note">Our advisors are available 6 days a week.</p>
            <a href="https://wa.me/919876543210" style="display:inline-flex;align-items:center;gap:8px;margin-top:16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.7);border-bottom:1px solid rgba(255,255,255,0.2);padding-bottom:3px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="inner">
            <p>© ${year} Auto Elite. All rights reserved. · GSTIN: 07XXXXX1234Z1</p>
            <p class="upper">Delhi NCR · Certified Pre-Owned</p>
          </div>
        </div>
      </footer>
    `;
  }

  /* ── Vehicle card renderer ──────────────────────────────── */
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
            <span>${v.mileage.toLocaleString()} km</span><span>·</span>
            <span>${v.fuel}</span>
          </div>
          <div class="price-row">
            <span class="from">Asking</span>
            <span class="price">${MM.formatPrice(v.price)}</span>
          </div>
        </div>
      </a>
    `;
  };

  /* ── Init ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
  });
})();