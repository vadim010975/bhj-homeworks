const hasTooltripElements = document.querySelectorAll('.has-tooltip');

const showClue = function(el) {
  document.querySelectorAll('.tooltip_active').forEach(element => element.remove());
  const tooltripElement = document.createElement('div');
  tooltripElement.innerText = el.getAttribute('title');
  tooltripElement.classList.add('tooltip', 'tooltip_active');
  switch(el.dataset.position) {
    case 'top':
      tooltripElement.style.bottom = (window.innerHeight - el.getBoundingClientRect().top).toFixed(0) + 'px';
      tooltripElement.style.left = el.getBoundingClientRect().left.toFixed(0) + 'px';
      break;
    case 'left':
      tooltripElement.style.right = (document.documentElement.clientWidth - el.getBoundingClientRect().left).toFixed(0) + 'px';
      tooltripElement.style.top = el.getBoundingClientRect().top.toFixed(0) + 'px';
      break;
    case 'right':
      tooltripElement.style.left = el.getBoundingClientRect().right.toFixed(0) + 'px';
      tooltripElement.style.top = el.getBoundingClientRect().top.toFixed(0) + 'px';
      break;
    case 'bottom':
      tooltripElement.style.top = el.getBoundingClientRect().bottom.toFixed(0) + 'px';
      tooltripElement.style.left = el.getBoundingClientRect().left.toFixed(0) + 'px';
  }
  el.insertAdjacentElement('afterend', tooltripElement);
}

for (const element of hasTooltripElements) {
  element.addEventListener('click', (e => {
    e.preventDefault();
    showClue(e.currentTarget);
    }));
}







