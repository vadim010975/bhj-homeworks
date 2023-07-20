const elementsRotator = document.querySelectorAll('.rotator');
const setNextCaseActive = el => {
  let elementCaseActive = el.querySelector('.rotator__case_active');
  elementCaseActive.classList.remove('rotator__case_active');
  elementCaseActive = elementCaseActive.nextElementSibling;
  if ((elementCaseActive) && (elementCaseActive.classList.contains('rotator__case'))) {
    elementCaseActive.classList.add('rotator__case_active');
  } else {
    el.firstElementChild.classList.add('rotator__case_active');
  }
  const interval = elementCaseActive.dataset.dataSpeed;
  const color = elementCaseActive.dataset.dataColor;
  
  setTimeout(() => {

  }, interval);
}










elementsRotator.forEach(el => {
  
  setInterval(() => setNextCaseActive(el), 1000);
});