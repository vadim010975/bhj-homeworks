const formElement = document.getElementById('signin__form');

const sendForm = (formData) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', formElement.action);
  xhr.responseType = 'json';
  xhr.onload = () => {
    if (xhr.readyState != 4) {
      return;
    }
    const response = xhr.response;
    changeResponse(response);
  }
  xhr.send(formData);
}

const changeResponse = obj => {
  if (obj.success) {
    showWelcome(obj.user_id);
    saveId(obj.user_id);
  } else {
    alert('неверные логин/пароль');
  }
}

const showWelcome = id => {
  document.getElementById('signin').classList.remove('signin_active');
  document.getElementById('user_id').textContent = id;
  document.getElementById('welcome').classList.add('welcome_active');
}

const hideWelcome = () => {
  delete localStorage.auth;
  document.getElementById('welcome').classList.remove('welcome_active');
  document.getElementById('signin').classList.add('signin_active');
}

const saveId = id => {
  localStorage.auth = id;
}

const loadId = () => {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === 'auth') {
      showWelcome(localStorage[localStorage.key(i)]);
    }
  }
}

formElement.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(formElement);
  if (formData.get('login') && formData.get('password')) {
    sendForm(formData);
  }
  e.currentTarget.reset();
});

document.getElementById('out__btn').addEventListener('click', () => {
  hideWelcome();
});

loadId();
