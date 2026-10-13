/* Case 01 disclosure navigation. Native links remain usable without JavaScript. */
(() => {
  const control = document.querySelector('[data-case-contents]');
  if (!control) return;
  const button = control.querySelector('button');
  const panel = control.querySelector('nav');
  const links = [...panel.querySelectorAll('a')];
  function close(returnFocus = false) {
    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    if (returnFocus) button.focus();
  }
  button.addEventListener('click', () => {
    const opening = panel.hidden;
    panel.hidden = !opening;
    button.setAttribute('aria-expanded', String(opening));
    if (opening) links[0].focus();
  });
  links.forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.hash);
    if (!target) return;
    event.preventDefault();
    close();
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    history.replaceState(null, '', link.hash);
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      event.preventDefault();
      close(true);
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!panel.hidden && !control.contains(event.target)) close(panel.contains(document.activeElement));
  });
  control.addEventListener('focusout', event => {
    if (!control.contains(event.relatedTarget)) close();
  });
})();
