(() => {
  const path = document.querySelector('[data-method-path]');
  if (!path) return;

  const stages = [...path.querySelectorAll('[data-method-stage]')];
  const track = path.querySelector('.method-track');

  const activate = stage => {
    const index = Number(stage.dataset.methodStage);
    stages.forEach(candidate => {
      const active = candidate === stage;
      candidate.classList.toggle('is-active', active);
      candidate.querySelector('button').setAttribute('aria-expanded', String(active));
    });
    track.style.setProperty('--method-progress', String(index / (stages.length - 1)));
  };

  stages.forEach(stage => {
    const button = stage.querySelector('button');
    button.addEventListener('click', () => activate(stage));
    button.addEventListener('focus', () => activate(stage));
    stage.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') activate(stage);
    });
  });
})();
