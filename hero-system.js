(() => {
  const system = document.querySelector('[data-support-system]');
  if (!system) return;

  const nodes = [...system.querySelectorAll('[data-support]')];
  const core = system.querySelector('.support-core');
  const fields = {
    kicker: system.querySelector('[data-support-kicker]'),
    title: system.querySelector('[data-support-title]'),
    copy: system.querySelector('[data-support-copy]')
  };
  const defaultContent = {
    kicker: 'THE TUTRONIX METHOD',
    title: 'Three kinds of support.<br>One connected plan.',
    copy: 'Each part works together around the student, the schoolwork and the week ahead.'
  };
  const content = {
    coaching: {
      kicker: 'ACADEMIC COACHING',
      title: 'Learn how to learn.',
      copy: 'Build stronger study strategies, confidence and independence that carry across classes.'
    },
    tutoring: {
      kicker: 'PERSONALIZED TUTORING',
      title: 'Understand the material.',
      copy: 'Work through difficult concepts, solve problems and prepare for tests with expert guidance.'
    },
    executive: {
      kicker: 'EXECUTIVE FUNCTION COACHING',
      title: 'Know what comes next.',
      copy: 'Plan time, organize assignments, begin tasks, set priorities and follow through.'
    }
  };
  let pinned = null;

  const render = key => {
    const next = key ? content[key] : defaultContent;
    system.dataset.active = key || '';
    nodes.forEach(node => node.setAttribute('aria-pressed', String(node.dataset.support === pinned)));
    fields.kicker.textContent = next.kicker;
    fields.title.innerHTML = next.title;
    fields.copy.textContent = next.copy;
    core.classList.remove('is-changing');
    requestAnimationFrame(() => core.classList.add('is-changing'));
  };

  nodes.forEach(node => {
    const key = node.dataset.support;
    node.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') render(key);
    });
    node.addEventListener('focus', () => render(key));
    node.addEventListener('click', () => {
      pinned = pinned === key ? null : key;
      render(pinned);
    });
  });

  system.addEventListener('pointerleave', () => render(pinned));
})();
