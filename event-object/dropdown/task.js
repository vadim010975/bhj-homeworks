const elementsDropdown = document.querySelectorAll('.dropdown');
function showDropdownList(el) {
  if (el.classList.contains('dropdown')) {
    el.querySelector('.dropdown__list').classList.toggle('dropdown__list_active');
  }
}

elementsDropdown.forEach(elementDropdown => {
  elementDropdown.addEventListener('click', function (el) {
    if (el.target.classList.contains('dropdown__link')) {
      el.preventDefault();
      this.querySelector('.dropdown__value').textContent = el.target.textContent.trim();
    }
    showDropdownList(this);
  });
});
