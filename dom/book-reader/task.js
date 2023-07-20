const elementControlFontSize = document.querySelector('.book__control_font-size');
const elementControlColor = document.querySelector('.book__control_color');
const elementControlBackground = document.querySelector('.book__control_background');

const elementsBookControls = document.querySelectorAll('.book__control');

const setFontSize = (el) => {
  const elementBook = document.getElementById('book');
  if (el.dataset.size === 'small') {
    elementBook.classList.remove('book_fs-big');
    elementBook.classList.add('book_fs-small');
    return;
  }
  if (el.dataset.size === 'big') {
    elementBook.classList.add('book_fs-big');
    elementBook.classList.remove('book_fs-small');
    return;
  }
  elementBook.classList.remove('book_fs-small', 'book_fs-big');
}


// elementControlFontSize.addEventListener('click', function (e) {
//   e.preventDefault();
//   this.querySelectorAll('.font-size').forEach(el => {
//     if (e.target === el) {
//       el.classList.add('font-size_active');
//       setFontSize(el);
//     } else {
//       el.classList.remove('font-size_active');
//     }
//   });
// });

const getClasses = (elementsA) => {
  const arrClasses = [];
  [...elementsA].forEach(el => {
    el.classList.forEach(cl => {
      const index = cl.indexOf('active');
      if (index > 0) {
        arrClasses[0] = cl.substring(0, index - 1);
        arrClasses[1] = cl;
      }
    });
  });
  return arrClasses;
}

const changeAppearance = (elementBookControls) => {
  const elementsA = elementBookControls.getElementsByTagName('a');
  const mainCssClass = getClasses(elementsA)[0];
  const activeCssClass = getClasses(elementsA)[1];
  elementBookControls.addEventListener('click', function (e) {
    e.preventDefault();
    [...elementsA].forEach(el => {
      if (e.target === el) {
        el.classList.add(activeCssClass);
        //setFontSize(el);
      } else {
        el.classList.remove(activeCssClass);
      }
    });
  });
}


changeAppearance(elementControlFontSize);