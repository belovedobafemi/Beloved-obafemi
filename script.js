const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  siteNav.classList.toggle('open', !isOpen);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    siteNav.classList.remove('open');
  });
});

const currentPage = location.pathname.split('/').pop() || 'index.html';
siteNav.querySelectorAll('a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-tilt], .portrait-frame').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty('--px', (x - 0.5).toFixed(3));
      card.style.setProperty('--py', (y - 0.5).toFixed(3));
      if (card.hasAttribute('data-tilt')) {
        card.style.transform = `perspective(850px) rotateY(${(0.5-x)*9}deg) rotateX(${(y-0.5)*7}deg) translateZ(8px)`;
      }
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--px');
      card.style.removeProperty('--py');
      if (card.hasAttribute('data-tilt')) card.style.removeProperty('transform');
    });
  });
}
