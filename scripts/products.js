const productTemplate = document.querySelector('#product').content.querySelector('.basket__item');
const editProductElement = document.querySelector('.basket__items');

function deleteProduct(event) {
  const button = event.target;

  const product = button.closest('.basket__item');
  calcProductsPrice();

  product.remove();
  calcProductsPrice();
}

function createProduct(item) {
  const productElement = productTemplate.cloneNode(true);
  const productImage = productElement.querySelector('.item__image');
  const productTitle = productElement.querySelector('.item__title');
  const productColor = productElement.querySelector('.item__color');
  const productSize = productElement.querySelector('.item__size');
  const productOgrn = productElement.querySelector('.item__ogrn');
  const productWarehouse = productElement.querySelector('.item__warehouse');
  const productAddress = productElement.querySelector('.item__address');
  const productStore = productElement.querySelector('.item__store');
  const productPrice = productElement.querySelector('.item-price');
  const productOldPrice = productElement.querySelector('.item-price__old');
  const deleteButton = productElement.querySelector('.item__button-delete');
  const minusButton = productElement.querySelector('.count__button_type_minus');
  const plusButton = productElement.querySelector('.count__button_type_plus');
  const counter = productElement.querySelector('.count__text');
  const checkbox = productElement.querySelector('.checkbox');

  function discountedPrice(price) {
    const discount = percentage(price, 55);
    const personalDiscount = percentage(price, 10);
    return Math.round(price - (discount + personalDiscount));
  }

  function finalPrice(price) {
    productPrice.textContent = discountedPrice(item.price * price);
    productOldPrice.textContent = `${item.price * price} сом`;
  }

  checkbox.addEventListener('click', function () {
    if (checkbox.checked) {
      calcProductsPrice();
    } else {
      calcProductsPrice();
    }
  });

  minusButton.addEventListener('click', () => {
    if (counter.value > 1) {
      --counter.value;
      finalPrice(counter.value);
      calcProductsPrice();
    }
    counter.setAttribute('value', counter.value);
  });

  counter.addEventListener('input', e => {
    if (e.target.value === '0') {
      e.target.value = 1;
    }
    if (e.target.value > item.amount) {
      e.target.value = item.amount;
    }

    counter.setAttribute('value', e.target.value);
    finalPrice(e.target.value);
    calcProductsPrice();
  });

  plusButton.addEventListener('click', () => {
    if (counter.value < item.amount) {
      ++counter.value;
      finalPrice(counter.value);
      calcProductsPrice();
    }
    counter.setAttribute('value', counter.value);
    finalPrice(counter.value);
  });

  if (item.color === undefined && item.size === undefined) {
    productElement.querySelector('.item__c-s').remove();
  }

  finalPrice(item.price);
  productImage.setAttribute('alt', item.title);
  productImage.setAttribute('src', item.link);
  productTitle.textContent = item.title;
  productColor.textContent = item.color === undefined ? '' : `Цвет: ${item.color}`;
  productSize.textContent = item.size === undefined ? '' : `Размер: ${item.size}`;
  productOgrn.textContent = item.ogrn;
  productWarehouse.textContent = item.warehouse;
  productAddress.textContent = item.address;
  productStore.textContent = item.company;
  productPrice.textContent = discountedPrice(item.price);
  productOldPrice.textContent = `${item.price} сом`;

  deleteButton.addEventListener('click', deleteProduct);
  productElement.querySelector('.item__button-like').addEventListener('click', function (event) {
    event.preventDefault();
    event.target.classList.toggle('item__button-like_active');
  });

  return productElement;
}

function renderPlace(item) {
  editProductElement.prepend(createProduct(item));
}

initialCards.forEach(renderPlace);
calcProductsPrice();
