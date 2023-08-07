const modalElement = document.getElementById('subscribe-modal');
const modalCloseElement = document.querySelector('.modal__close');

function getCookie(name) {
  if (!name) {
    return;
  }
  const pairs = document.cookie.split('; ');
  const cookie = pairs.find(p => p.startsWith(name + '='));
  const value = cookie.substr(name.length + 1);
  return value;
}
  

if (document.cookie.indexOf('popup') === -1 || getCookie('popup') !== 'closed') {
  modalElement.classList.add('modal_active');
}

modalCloseElement.addEventListener('click', e => {
  modalElement.classList.remove('modal_active');
  document.cookie = 'popup=' + encodeURIComponent('closed');
});
