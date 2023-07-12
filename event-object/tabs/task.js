const elTabs = document.querySelector('.tabs');

function setContent(el) {
  const elementsTab = el.querySelectorAll('.tab');
  const elementsTabContent = el.querySelectorAll('.tab__content');
  const countElements = Math.min(elementsTab.length, elementsTabContent.length);
  el.querySelector('.tab__navigation').addEventListener('click', (e) => {
    for (let i = 0; i < countElements; i++) {
      if (elementsTab[i] === e.target) {
        elementsTab[i].classList.add('tab_active');
        elementsTabContent[i].classList.add('tab__content_active');
      } else {
        elementsTab[i].classList.remove('tab_active');
        elementsTabContent[i].classList.remove('tab__content_active');
      }
    }
  });
}

setContent(elTabs);