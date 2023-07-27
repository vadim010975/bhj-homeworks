const elementsReveal = document.querySelectorAll('.reveal');
const showReveal = (el) => {
  const { top, bottom } = el.getBoundingClientRect();
  if (bottom > 0 && top < window.innerHeight) {
    el.classList.add('reveal_active');
  } else {
    el.classList.remove('reveal_active');
  }
}

elementsReveal.forEach(el => {
  window.addEventListener('scroll', () => showReveal(el));
});
