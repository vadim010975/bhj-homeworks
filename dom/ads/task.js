const elementsRotator = document.querySelectorAll('.rotator');

const setNextCaseActive = el => {
  el.classList.remove('rotator__case_active');
  const nextElement = el.nextElementSibling;
  if ((nextElement) && (nextElement.classList.contains('rotator__case'))) {
    nextElement.classList.add('rotator__case_active');
  } else {
    el.closest('.rotator').firstElementChild.classList.add('rotator__case_active');
  }
}

const changeAds = el => {
  const elementCaseActive = el.querySelector('.rotator__case_active');
  elementCaseActive.style.color = elementCaseActive.dataset.color;
  const speed = elementCaseActive.dataset.speed;
  setTimeout(() => {
    setNextCaseActive(elementCaseActive);
    changeAds(el);
  }, speed);
}

elementsRotator.forEach(el => {
  changeAds(el);
});
