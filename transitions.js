(() => {
  const sections = [...document.querySelectorAll('main > section:not(.hero)')];
  if (!sections.length) return;

  const tones = ['blue', 'yellow', 'green', 'coral'];
  sections.forEach((section, index) => {
    section.classList.add('flow-section');
    section.dataset.flow = index % 2 ? 'right' : 'left';
    section.dataset.tone = tones[index % tones.length];
    const trigger = document.createElement('span');
    trigger.className = 'flow-trigger';
    trigger.setAttribute('aria-hidden', 'true');
    trigger._flowSection = section;
    section.before(trigger);
  });
  document.documentElement.classList.add('flow-ready');

  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target?.classList.contains('flow-section')) {
      target.classList.add('flow-visible', 'flow-skip');
      addEventListener('load', () => {
        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        target.scrollIntoView({ block: 'start' });
        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = previousBehavior;
        });
      }, { once: true });
    }
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sections.forEach(section => section.classList.add('flow-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target._flowSection.classList.add('flow-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -16% 0px' });

  document.querySelectorAll('.flow-trigger').forEach(trigger => observer.observe(trigger));
})();
