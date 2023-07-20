const reveal = document.querySelector('.reveal');
const showReveal = (el) => {
  const { top, bottom } = el.getBoundingClientRect();
  if (bottom > 0 && top < window.innerHeight) {
    reveal.classList.add('reveal_active');
  } else {
    reveal.classList.remove('reveal_active');
  }
}

window.addEventListener('scroll', () => showReveal(reveal));