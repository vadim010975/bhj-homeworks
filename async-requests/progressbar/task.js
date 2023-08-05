const formElement = document.getElementById('form');
const progress = document.getElementById('progress');

const sendForm = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', formElement.action);
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== xhr.DONE) {
      return;
    }
  }
  xhr.upload.addEventListener('progress', progressHandler, false);
  const formData = new FormData(formElement)
  xhr.send(formData);
}

function progressHandler(event) {
  progress.value = event.loaded / event.total;
}

formElement.addEventListener('submit', e => {
  e.preventDefault();
  if (progress.value === 0) {
    sendForm();
  }
});

formElement.querySelector('label').addEventListener('click', e => {
  if (progress.value === 1) {
    progress.value = 0;
    document.querySelector('.input__wrapper-desc').textContent = '';
  } else if (progress.value !== 0) {
    e.preventDefault();
  }
});