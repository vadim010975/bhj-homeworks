const buttonElement = document.getElementById('tasks__add');
const inputElement = document.getElementById('task__input');
const tasksListElement = document.getElementById('tasks__list');
const tasksFormElement = document.getElementById('tasks__form');

const saveTask = (task) => {
  localStorage.setItem(new Date(), task);
}

const loadTasks = () => {
  for (let i = 0; i < localStorage.length; i++) {
    showTask(localStorage[localStorage.key(i)]);
  }
}

const deleteTask = (task) => {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage[localStorage.key(i)] === task) {
      delete localStorage[localStorage.key(i)];
    }
  }
}

const showTask = (task) => {
  const taskTitleElement = document.createElement('div');
  taskTitleElement.classList.add('task__title');
  taskTitleElement.textContent = task;
  const taskRemoveElement = document.createElement('a');
  taskRemoveElement.classList.add('task__remove');
  taskRemoveElement.setAttribute('href', '#');
  taskRemoveElement.innerHTML = '&times;';
  taskRemoveElement.addEventListener('click', () => {
    taskElement.remove();
    deleteTask(task);
  });
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.insertAdjacentElement('afterbegin', taskTitleElement);
  taskElement.insertAdjacentElement('beforeend', taskRemoveElement);
  tasksListElement.insertAdjacentElement('beforeend', taskElement);
}

buttonElement.addEventListener('click', () => {
  if (inputElement.value) {
    showTask(inputElement.value);
    saveTask(inputElement.value);
    tasksFormElement.reset();
  }
});

loadTasks();