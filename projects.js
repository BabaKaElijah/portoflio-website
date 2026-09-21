const projectModal = document.getElementById('project-modal');

if (projectModal) {
  const title = projectModal.querySelector('.modal-title');
  const description = projectModal.querySelector('.modal-desc');
  const stack = projectModal.querySelector('.modal-stack');
  const link = projectModal.querySelector('.modal-link');
  const closeButton = projectModal.querySelector('.modal-close');
  let previousFocus = null;

  document.querySelectorAll('.project-card').forEach((card) => {
    card.querySelector('.project-quick')?.addEventListener('click', () => {
      previousFocus = document.activeElement;
      title.textContent = card.dataset.title;
      description.textContent = card.dataset.desc;
      stack.textContent = `Stack: ${card.dataset.stack}`;
      link.href = card.dataset.link;
      projectModal.classList.add('show');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      closeButton.focus();
    });
  });

  const closeModal = () => {
    projectModal.classList.remove('show');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    previousFocus?.focus();
  };

  closeButton.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (!projectModal.classList.contains('show')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'Tab') {
      const focusable = [closeButton, link];
      const current = focusable.indexOf(document.activeElement);
      event.preventDefault();
      focusable[(current + (event.shiftKey ? focusable.length - 1 : 1)) % focusable.length].focus();
    }
  });
}
