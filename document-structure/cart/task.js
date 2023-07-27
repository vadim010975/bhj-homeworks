const productElements = document.querySelectorAll('.product');
const cartProductsElement = document.querySelector('.cart__products');

const changeValue = (el) => {
  const productQuantityValueElement = el.closest('.product__quantity-controls').querySelector('.product__quantity-value');
  if (el.textContent.trim() === '+') {
    productQuantityValueElement.textContent++;
  } else if (el.textContent.trim() === '-') {
    productQuantityValueElement.textContent > 1 ? productQuantityValueElement.textContent-- : productQuantityValueElement.textContent = 1;
  }
}

const checkCart = (el) => {
  const cartProduct = [...cartProductsElement.querySelectorAll('.cart__product')].find(element => element.dataset.id === el.dataset.id);
  if(cartProduct) {
    return cartProduct.querySelector('.cart__product-count');
  }
  return false;
}

const addCart = (el) => {
  const productElement = el.closest('.product');
  const productQuantityValue = +productElement.querySelector('.product__quantity-value').textContent;
  const foundElement = checkCart(productElement);
  if (foundElement) {
    const count = +foundElement.textContent;
    foundElement.textContent = count + productQuantityValue;
    return;
  }
  const cartProductElement = document.createElement('div');
  cartProductElement.classList.add('cart__product');
  cartProductElement.dataset.id = productElement.dataset.id;
  const imgElement = productElement.querySelector('img').cloneNode(true);
  imgElement.classList.remove('product__image');
  imgElement.classList.add('cart__product-image');
  const cartProductCountElement = document.createElement('div');
  cartProductCountElement.classList.add('cart__product-count');
  cartProductCountElement.textContent = productQuantityValue;
  cartProductElement.insertAdjacentElement('afterbegin', imgElement);
  cartProductElement.insertAdjacentElement('beforeend', cartProductCountElement);
  cartProductsElement.insertAdjacentElement('beforeend', cartProductElement);
}


for (const productElement of productElements) {
  productElement.querySelectorAll('.product__quantity-control').forEach(el => {
    el.addEventListener('click', e => changeValue(e.currentTarget));
  });
  productElement.querySelector('.product__add').addEventListener('click', e => addCart(e.currentTarget));
}