const patternData = {
  organization: {
    number: '01', meter: 112, kicker: 'MAKE THE WORK VISIBLE', title: 'From scattered to findable.',
    notice: 'Assignments live in different places, materials go missing, or the student is surprised by work they already knew about.',
    practice: 'One trusted place for assignments, deadlines, materials, and the next action for every class.',
    progress: 'I know where everything is, and I know what comes next.'
  },
  prioritization: {
    number: '02', meter: 92, kicker: 'DECIDE WHAT MATTERS FIRST', title: 'From everything-now to a clear order.',
    notice: 'The student starts with the easiest task, avoids the important one, or treats every assignment as equally urgent.',
    practice: 'Compare urgency, effort, and impact—then choose the first useful step instead of reacting to the loudest task.',
    progress: 'This is due first, so I’m starting here—and I can explain why.'
  },
  initiation: {
    number: '03', meter: 72, kicker: 'LOWER THE STARTING LINE', title: 'From stuck to started.',
    notice: 'A task is understood but starting feels disproportionately hard, especially when it is large, vague, or uncomfortable.',
    practice: 'Shrink the first step until it is concrete: open the document, write the heading, solve one problem, set ten minutes.',
    progress: 'I didn’t feel ready, but I knew the first step and began anyway.'
  },
  time: {
    number: '04', meter: 52, kicker: 'MAKE TIME CONCRETE', title: 'From guessing to planning realistically.',
    notice: 'Work regularly takes longer than expected, deadlines feel sudden, or a busy day has no room for recovery.',
    practice: 'Estimate honestly, plan backward from deadlines, and place focused work into the actual week—not an imaginary one.',
    progress: 'I know how long this might take, and I’ve made space for it.'
  },
  followthrough: {
    number: '05', meter: 32, kicker: 'CLOSE THE LOOP', title: 'From a good plan to completed work.',
    notice: 'Tasks are started but not submitted, plans disappear after Monday, or checking the final details gets skipped.',
    practice: 'Use visible checkpoints, brief accountability, and a simple finish routine: review, submit, confirm, reset.',
    progress: 'It’s finished, checked, and submitted—not just almost done.'
  }
};

const explorer = document.querySelector('[data-pattern-explorer]');

if (explorer) {
  const tabs = [...explorer.querySelectorAll('[role="tab"]')];
  const panel = explorer.querySelector('[role="tabpanel"]');
  const fields = {
    number: panel.querySelector('[data-meter-number]'), kicker: panel.querySelector('[data-kicker]'),
    title: panel.querySelector('[data-title]'), notice: panel.querySelector('[data-notice]'),
    practice: panel.querySelector('[data-practice]'), progress: panel.querySelector('[data-progress]')
  };

  const selectSkill = (tab, focus = false) => {
    const data = patternData[tab.dataset.skill];
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panel.classList.add('is-changing');
    fields.number.textContent = data.number;
    fields.kicker.textContent = data.kicker;
    fields.title.textContent = data.title;
    fields.notice.textContent = data.notice;
    fields.practice.textContent = data.practice;
    fields.progress.textContent = data.progress;
    panel.style.setProperty('--meter-offset', data.meter);
    panel.setAttribute('aria-labelledby', tab.id);
    requestAnimationFrame(() => panel.classList.remove('is-changing'));
    if (focus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectSkill(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      selectSkill(tabs[next], true);
    });
  });
}
