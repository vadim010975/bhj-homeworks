const elementsBookControls = document.querySelectorAll('.book__control');

const objectClassNames = {
  'size': {
    'small': 'book_fs-small',
    'big': 'book_fs-big'
  },
  'textColor': {
    'black': 'book_color-black',
    'gray': 'book_color-gray',
    'whitesmoke': 'book_color-whitesmoke'
  },
  'bgColor': {
    'black': 'book_bg-black',
    'gray': 'book_bg-gray',
    'white': 'book_bg-white'
  }
}

const setParameters = el => {
  const elementBook = document.getElementById('book');
  const datasetKey = Object.keys(el.dataset)[0] || 'size'; // костыль
  for (let key in objectClassNames[datasetKey]) {
    if (el.dataset[datasetKey] === key) {
      elementBook.classList.add(objectClassNames[datasetKey][key]);
    } else {
      elementBook.classList.remove(objectClassNames[datasetKey][key]);
    }
  }
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

elementsBookControls.forEach(el => changeAppearance(el));