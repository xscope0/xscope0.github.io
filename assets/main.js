// xscope0 docs — tiny enhancements, no dependencies.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Copy buttons on every <pre>
document.querySelectorAll('pre').forEach(pre => {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.type = 'button';
  btn.textContent = 'copy';
  btn.addEventListener('click', () => {
    const code = pre.querySelector('code') || pre;
    navigator.clipboard.writeText(code.innerText.trim()).then(() => {
      btn.textContent = 'copied';
      setTimeout(() => (btn.textContent = 'copy'), 1400);
    }).catch(() => { btn.textContent = 'err'; });
  });
  pre.appendChild(btn);
});

// 2. Scroll-spy for the table of contents
const tocLinks = [...document.querySelectorAll('.toc a')];
if (tocLinks.length) {
  const sections = tocLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        tocLinks.forEach(a =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + id)
        );
      }
    });
  }, { rootMargin: '-80px 0px -70% 0px' });
  sections.forEach(s => spy.observe(s));
}

// 3. Reveal-on-scroll — smoother, gently staggered (respects reduced motion)
if (!reduceMotion) {
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const delay = Number(el.dataset.revealDelay || 0);
        el.style.transition =
          'opacity .7s cubic-bezier(.33,.02,.18,1) ' + delay + 'ms,' +
          'transform .7s cubic-bezier(.33,.02,.18,1) ' + delay + 'ms';
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        obs.unobserve(el);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    if (!el.dataset.revealDelay) el.dataset.revealDelay = (i % 5) * 70;
    reveal.observe(el);
  });
}

// 4. Light, smooth "select" pulse on interactive picks (cards, chips, toc, nav)
function pulse(el) {
  if (reduceMotion || !el) return;
  el.classList.remove('is-selecting');
  // reflow so the animation can replay on rapid re-selection
  void el.offsetWidth;
  el.classList.add('is-selecting');
  el.addEventListener('animationend', () => el.classList.remove('is-selecting'),
    { once: true });
}

document.querySelectorAll(
  '.card, .chip, .badge, .toc a, .nav-links a, .steps li'
).forEach(el => {
  el.addEventListener('pointerdown', () => pulse(el));
});

// 5. Make tech chips / badges interactive links to the things they name
const TECH_LINKS = {
  'supabase':   'https://supabase.com',
  'vanilla js': 'http://vanilla-js.com',
  'temp-mail':  'https://github.com/xscope0/Ghostbox',
  'otp':        'https://en.wikipedia.org/wiki/One-time_password',
  'proxy':      'https://github.com/xscope0/xScope0-Router',
  'sqlite':     'https://www.sqlite.org',
  'tray':       'https://github.com/xscope0/xScope0-Router#features',
  'ios':        'https://www.apple.com/ios',
  'sideload':   'https://en.wikipedia.org/wiki/Sideloading',
  'poc':        'https://en.wikipedia.org/wiki/Proof_of_concept',
  'node.js':    'https://nodejs.org',
  'swift':      'https://www.swift.org',
  'mit':        'https://opensource.org/license/mit',
  'agpl-3.0':   'https://www.gnu.org/licenses/agpl-3.0.html'
};

function linkifyTech() {
  document.querySelectorAll('.chip, .badge').forEach(el => {
    if (el.closest('a') || el.querySelector('a')) return;
    // use the last text token (handles "<span class=k>stack</span> vanilla JS")
    const key = el.textContent.trim().toLowerCase();
    const href = TECH_LINKS[key] ||
      TECH_LINKS[(el.lastChild && el.lastChild.textContent || '').trim().toLowerCase()];
    if (!href) return;
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = el.className;     // keep chip/badge styling
    a.innerHTML = el.innerHTML;
    a.setAttribute('aria-label', el.textContent.trim() + ' — open reference');
    a.addEventListener('pointerdown', () => pulse(a));
    el.replaceWith(a);
  });
}
linkifyTech();

document.querySelectorAll('.yr').forEach(e =>
  e.textContent = new Date().getFullYear());
