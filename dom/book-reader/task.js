const elementControlFontSize = document.querySelector('.book__control_font-size');
const elementControlColor = document.querySelector('.book__control_color');
const elementControlBackground = document.querySelector('.book__control_background');

const elementsBookControls = document.querySelectorAll('.book__control');

const setParameters = el => {
  const elementBook = document.getElementById('book');
  const activeCssClassName = [...el.classList].find(classItem => classItem.includes('active'));
  const mainCssClassName = activeCssClassName.slice(0, -7);
  const secondCssClassName = [...el.classList].find(classItem => classItem != activeCssClassName && classItem != mainCssClassName);
  console.log(secondCssClassName);
}



const getActiveCssClassName = (elementsA) => {
  let activeCssClassName;
  [...elementsA].forEach(el => {
    activeCssClassName = [...el.classList].find(classItem => classItem.includes('active')) || activeCssClassName;
  });
  return activeCssClassName;
}


const changeAppearance = (elementBookControls) => {
  const elementsA = elementBookControls.getElementsByTagName('a');
  const activeCssClassName = getActiveCssClassName(elementsA);
  elementBookControls.addEventListener('click', function (e) {
    e.preventDefault();
    [...elementsA].forEach(el => {
      if (e.target === el) {
        el.classList.add(activeCssClassName);
        setParameters(el);
      } else {
        el.classList.remove(activeCssClassName);
      }
    });
  });
}


changeAppearance(elementControlFontSize);