const productElements = document.querySelectorAll('.product');
const cartProductsElement = document.querySelector('.cart__products');
const cartTitle = document.querySelector('.cart__title');
const speedMovement = 800;

const changeValue = (el, valueElement) => {
  if (el.textContent.trim() === '+') {
    valueElement.textContent++;
  } else if (el.textContent.trim() === '-') {
    valueElement.textContent > 1 ? valueElement.textContent-- : valueElement.textContent = 1;
  }
}

const checkCart = (el) => {
  const cartProduct = [...cartProductsElement.querySelectorAll('.cart__product')].find(element => element.dataset.id === el.dataset.id);
  if (cartProduct) {
    return cartProduct;
  }
  return false;
}

const isEmptyInCart = () => {
  if (cartProductsElement.querySelectorAll('.cart__product').length === 0) {
    cartTitle.classList.remove('cart__title_activated');
  }
}

const hidingPictures = (el) => {
  setTimeout(() => {
    el.remove();
  }, speedMovement);
}

const movingPictures = (el, cartEl) => {
  const cloneImg = el.cloneNode(true);
  cloneImg.classList.add('moved__img');
  cloneImg.style.setProperty('--speed', (speedMovement / 1000) + 's');
  cloneImg.style.left = el.getBoundingClientRect().left + 'px';
  cloneImg.style.top = el.getBoundingClientRect().top + 'px';
  el.closest('.product').insertAdjacentElement('beforeend', cloneImg);
  const cartImg = cartEl.querySelector('img');
  cloneImg.style.left = cartImg.getBoundingClientRect().left + 'px';
  cloneImg.style.top = cartImg.getBoundingClientRect().top + 'px';
  cloneImg.classList.remove('product__image');
  cloneImg.classList.add('cart__product-image');
  hidingPictures(cloneImg);
}

const showProduct = (dataId, count) => {
  const cartProductElement = document.createElement('div');
  cartProductElement.classList.add('cart__product');
  cartProductElement.dataset.id = dataId;
  const productElement = [...productElements].find(element => element.dataset.id === dataId);
  const imgElement = productElement.querySelector('.product__image').cloneNode(true);
  imgElement.classList.remove('product__image');
  imgElement.classList.add('cart__product-image');
  const cartProductCountElement = document.createElement('div');
  cartProductCountElement.classList.add('cart__product-count');
  cartProductCountElement.textContent = count;
  const cartQuantityControls = document.createElement('div');
  cartQuantityControls.classList.add('cart__quantity-controls');
  const cartQuantityControlDec = document.createElement('div');
  cartQuantityControlDec.classList.add('cart__quantity-control');
  cartQuantityControlDec.textContent = '+';
  cartQuantityControlDec.addEventListener('click', function (e) {
    changeValue(e.currentTarget, this.closest('.cart__product').querySelector('.cart__product-count'));
    saveOrder();
  });
  const cartQuantityControlInc = document.createElement('div');
  cartQuantityControlInc.classList.add('cart__quantity-control');
  cartQuantityControlInc.textContent = '-';
  cartQuantityControlInc.addEventListener('click', function (e) {
    changeValue(e.currentTarget, this.closest('.cart__product').querySelector('.cart__product-count'));
    saveOrder();
  });
  cartQuantityControls.insertAdjacentElement('beforeend', cartQuantityControlInc);
  cartQuantityControls.insertAdjacentElement('beforeend', cartQuantityControlDec);
  const cartProductRemoveElement = document.createElement('a');
  cartProductRemoveElement.classList.add('card__product-remove');
  cartProductRemoveElement.setAttribute('href', '#');
  cartProductRemoveElement.innerHTML = '&times;';
  cartProductRemoveElement.addEventListener('click', e => {
    e.currentTarget.closest('.cart__product').remove();
    saveOrder();
    isEmptyInCart();
  });
  cartProductElement.insertAdjacentElement('afterbegin', imgElement);
  cartProductElement.insertAdjacentElement('beforeend', cartProductCountElement);
  cartProductElement.insertAdjacentElement('beforeend', cartQuantityControls);
  cartProductElement.insertAdjacentElement('beforeend', cartProductRemoveElement);
  cartProductsElement.insertAdjacentElement('beforeend', cartProductElement);
  return cartProductElement;
}

const addCart = (el) => {
  const productElement = el.closest('.product');
  const productImageElement = productElement.querySelector('.product__image');
  const productQuantityValue = +productElement.querySelector('.product__quantity-value').textContent;
  const foundElement = checkCart(productElement);
  if (foundElement) {
    movingPictures(productImageElement, foundElement);
    const cartProductCountElement = foundElement.querySelector('.cart__product-count');
    const count = +cartProductCountElement.textContent;
    setTimeout(() => {
      cartProductCountElement.textContent = count + productQuantityValue;
    }, speedMovement);
    return;
  }
  const cartProductElement = showProduct(productElement.dataset.id, productQuantityValue);
  cartProductElement.style.opacity = '0';
  movingPictures(productImageElement, cartProductElement);
  setTimeout(() => {
    cartProductElement.style.opacity = '1';
  }, speedMovement);
}

const saveOrder = () => {
  const objOrder = {};
  cartProductsElement.querySelectorAll('.cart__product').forEach(element => {
    const dataId = element.dataset.id;
    const count = +element.querySelector('.cart__product-count').textContent;
    objOrder[dataId] = count;
  });
  const serialObj = JSON.stringify(objOrder);
  localStorage.setItem('cart', serialObj);
}

const loadOrder = () => {
  const obj = JSON.parse(localStorage.getItem('cart'));
  if (Object.keys(obj).length) {
    cartTitle.classList.add('cart__title_activated');
  }
  for (let key in obj) {
    showProduct(key, obj[key]);
  }
}

for (const productElement of productElements) {
  productElement.querySelectorAll('.product__quantity-control').forEach(el => {
    el.addEventListener('click', function (e) {
      changeValue(e.currentTarget, this.closest('.product__quantity-controls').querySelector('.product__quantity-value'));
    });
  });
  productElement.querySelector('.product__add').addEventListener('click', e => {
    cartTitle.classList.add('cart__title_activated');
    addCart(e.currentTarget);
    saveOrder();
  });
}

loadOrder();