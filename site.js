const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  const setMenuOpen = (open) => {
    navLinks.classList.toggle('show', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    const icon = menuToggle.querySelector('i');
    if (icon) icon.className = open ? 'fas fa-xmark' : 'fas fa-bars';
  };

  menuToggle.addEventListener('click', () => setMenuOpen(!navLinks.classList.contains('show')));
  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('show')) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setMenuOpen(false);
  });

  const page = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.querySelectorAll('a').forEach((link) => {
    if (link.getAttribute('href') === page) link.setAttribute('aria-current', 'page');
  });
}
