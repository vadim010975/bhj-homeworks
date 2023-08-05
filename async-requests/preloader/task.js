const reqestURL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
const itemsElement = document.querySelector('#items');

const showData = (obj) => {
  itemsElement.innerHTML = '';
  for (let key in obj.response.Valute) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemsElement.insertAdjacentElement('beforeend', itemElement);
    itemElement.innerHTML = 
    `<div class="item__code">
      ${obj.response.Valute[key].CharCode}
    </div>
    <div class="item__value">
      ${obj.response.Valute[key].Value}
    </div>
    <div class="item__currency">
      руб.
    </div>`
  };
}

const saveData = (obj) => {
  localStorage.setItem('preloader', JSON.stringify(obj));
}

const loadData = () => {
  const data = JSON.parse(localStorage.getItem('preloader'));
  if (data) {
    showData(data);
  }
}

const getData = () => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== xhr.DONE || xhr.status !== 200) {
      return;
    }
    response = JSON.parse(xhr.response);
    document.getElementById('loader').classList.remove('loader_active');
    showData(response);
    saveData(response);
  }
  xhr.open('GET', reqestURL);
  xhr.send();
}

loadData();
getData();