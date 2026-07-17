// ui-motion.js — site-wide progressive-enhancement motion layer.
// 1) Scroll-reveal: img, video, and [data-reveal] elements below the fold fade+rise in once.
// 2) Hover lift: media elements get a subtle lift + shadow on hover.
// Respects prefers-reduced-motion. Safe with streamed/React-rendered DOM (MutationObserver).
(function () {
  if (window.__uiMotion) return;
  window.__uiMotion = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var EASE = 'cubic-bezier(.22,1,.36,1)';
  var seen = new WeakSet();

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      io.unobserve(el);
      requestAnimationFrame(function () {
        el.style.opacity = '';
        el.style.transform = '';
        setTimeout(function () { el.style.transition = ''; }, 750);
      });
    });
  }, { threshold: 0.12 });

  function prep(el) {
    if (seen.has(el)) return;
    seen.add(el);
    var r = el.getBoundingClientRect();
    // Only animate things that start below the viewport — never blank what's already visible.
    if (r.top < window.innerHeight * 0.92) return;
    var left = el.getAttribute && el.getAttribute('data-reveal') === 'left';
    el.style.transition = 'opacity .55s ' + EASE + ', transform .55s ' + EASE;
    el.style.opacity = '0';
    el.style.transform = left ? 'translateX(-18px)' : 'translateY(22px)';
    io.observe(el);
  }

  function scan(root) {
    if (!root.querySelectorAll) return;
    root.querySelectorAll('img, video, [data-reveal]').forEach(prep);
  }

  var mo = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      m.addedNodes.forEach(function (n) {
        if (n.nodeType !== 1) return;
        if (n.matches && n.matches('img, video, [data-reveal]')) prep(n);
        scan(n);
      });
    });
  });

  function start() {
    scan(document);
    mo.observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);

  // --- Video autoplay enforcement (autoplay attrs don't always materialize) ---
  setInterval(function () {
    document.querySelectorAll('video').forEach(function (v) {
      v.muted = true;
      v.loop = true;
      v.setAttribute('playsinline', '');
      if (v.paused) { var p = v.play(); if (p) p.catch(function () {}); }
    });
  }, 900);

  // --- Scroll-driven timeline ([data-tl-entry]) ---
  // Drives active state directly in the DOM so it works regardless of the
  // component runtime. Active = entry containing (or nearest to) viewport 1/3.
  (function () {
    var last = -2;
    function drive() {
      requestAnimationFrame(drive);
      var nodes = document.querySelectorAll('[data-tl-entry]');
      if (!nodes.length) return;
      var target = window.innerHeight / 3;
      var best = -1, bestScore = Infinity;
      nodes.forEach(function (node) {
        var r = node.getBoundingClientRect();
        var inside = r.top <= target && r.bottom >= target;
        var score = inside ? -1 : Math.abs(r.top - target);
        if (score < bestScore) { bestScore = score; best = +node.getAttribute('data-tl-entry'); }
      });
      if (best === last) return;
      last = best;
      nodes.forEach(function (node) {
        var act = +node.getAttribute('data-tl-entry') === best;
        var rail = node.children[0], card = node.children[1];
        if (rail) {
          rail.style.opacity = act ? '1' : '0.4';
          var chip = rail.firstElementChild;
          if (chip) {
            chip.style.background = act ? '#B4451F' : 'transparent';
            chip.style.color = act ? '#F2F0EA' : '#141414';
          }
        }
        if (card) {
          card.style.boxShadow = act ? '0 18px 44px rgba(20,20,20,.14)' : 'none';
          var exp = card.querySelector('div[style*="grid-template-rows"]');
          if (exp) exp.style.gridTemplateRows = act ? '1fr' : '0fr';
        }
      });
    }
    requestAnimationFrame(drive);
  })();

  // --- Hover lift on media ---
  function media(t) {
    return t && t.tagName && (t.tagName === 'IMG' || t.tagName === 'VIDEO') && !t.closest('[data-no-lift]');
  }
  document.addEventListener('mouseover', function (e) {
    var t = e.target;
    if (!media(t)) return;
    if (t.style.opacity === '0') return; // mid-reveal
    if (!t.style.transition) t.style.transition = 'transform .35s ' + EASE + ', box-shadow .35s ' + EASE;
    t.style.transform = 'translateY(-4px)';
    t.style.boxShadow = '0 14px 34px rgba(20,20,20,.16)';
  });
  document.addEventListener('mouseout', function (e) {
    var t = e.target;
    if (!media(t)) return;
    if (t.style.opacity === '0') return;
    t.style.transform = '';
    t.style.boxShadow = '';
  });
})();
