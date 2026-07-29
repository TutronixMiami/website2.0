(() => {
  const sections = [...document.querySelectorAll('main > section:not(.hero)')];
  if (!sections.length) return;

  const tones = ['blue', 'yellow', 'green', 'coral'];
  sections.forEach((section, index) => {
    section.classList.add('flow-section');
    section.dataset.flow = index % 2 ? 'right' : 'left';
    section.dataset.tone = tones[index % tones.length];
    const flow = document.createElement('span');
    flow.className = 'section-flow';
    flow.setAttribute('aria-hidden', 'true');
    section.prepend(flow);
  });
  document.documentElement.classList.add('flow-ready');

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sections.forEach(section => section.classList.add('flow-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('flow-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .04, rootMargin: '0px 0px -10% 0px' });

  sections.forEach(section => observer.observe(section));
})();
