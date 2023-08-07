const editorElement = document.getElementById('editor');

const loadValueEditor = () => {
  return localStorage.editor ? localStorage.editor : '';
}

editorElement.addEventListener('input', e => {
  localStorage.editor = e.currentTarget.value;
});

editorElement.value = loadValueEditor();

const buttonElement = document.createElement('button');
buttonElement.classList.add('button');
buttonElement.textContent = 'очистить';
buttonElement.addEventListener('click', () => {
  editorElement.value = '';
  localStorage.editor = editorElement.value;
});
document.querySelector('main').append(buttonElement);