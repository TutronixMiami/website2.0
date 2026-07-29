(() => {
  const explorer = document.querySelector('[data-brain-explorer]');
  if (!explorer) return;

  const content = {
    organization: {
      number: '01 / EXECUTIVE FUNCTION', title: 'Organization',
      description: 'Keeping assignments, materials, and deadlines in a dependable system so important information does not have to live in working memory.',
      example: 'A student can see what is due, find what they need, and identify the next action for every class.'
    },
    prioritization: {
      number: '02 / EXECUTIVE FUNCTION', title: 'Prioritization',
      description: 'Deciding what deserves attention first by weighing urgency, effort, importance, and the consequences of waiting.',
      example: 'Instead of starting with whatever feels easiest, a student can explain what comes first and why.'
    },
    initiation: {
      number: '03 / EXECUTIVE FUNCTION', title: 'Task initiation',
      description: 'Crossing the gap between knowing what to do and actually beginning—especially when work feels large, vague, or uncomfortable.',
      example: 'A student turns “work on the essay” into a first action small enough to begin right now.'
    },
    time: {
      number: '04 / EXECUTIVE FUNCTION', title: 'Time management',
      description: 'Estimating duration, planning backward from deadlines, and matching schoolwork to the time that is truly available.',
      example: 'A student can see which days are crowded, begin preparation early, and leave room for the unexpected.'
    },
    followthrough: {
      number: '05 / EXECUTIVE FUNCTION', title: 'Follow-through',
      description: 'Staying with a plan through completion, review, and submission—even after the first burst of motivation fades.',
      example: 'A student closes the loop: finish, check, submit, confirm, and reset for the next task.'
    }
  };

  const zones = [...explorer.querySelectorAll('.brain-zone')];
  const detail = explorer.querySelector('.brain-detail');
  const fields = {
    number: explorer.querySelector('[data-brain-number]'),
    title: explorer.querySelector('[data-brain-title]'),
    description: explorer.querySelector('[data-brain-description]'),
    example: explorer.querySelector('[data-brain-example]')
  };

  const select = zone => {
    const item = content[zone.dataset.skill];
    zones.forEach(candidate => {
      const active = candidate === zone;
      candidate.classList.toggle('is-active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });
    fields.number.textContent = item.number;
    fields.title.textContent = item.title;
    fields.description.textContent = item.description;
    fields.example.textContent = item.example;
    detail.classList.remove('is-changing');
    requestAnimationFrame(() => detail.classList.add('is-changing'));
  };

  zones.forEach(zone => {
    zone.addEventListener('mouseenter', () => select(zone));
    zone.addEventListener('focus', () => select(zone));
    zone.addEventListener('click', () => select(zone));
    zone.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(zone);
      }
    });
  });
})();
