const checkboxPay = document.querySelector('.chekbox_type_payment');
const buttonDelivery = document.querySelector('.order__button');
function percentage(price, percentage) {
  return (price / 100) * percentage;
}

function discountedPrice(price) {
  const discount = percentage(price, 55);
  const personalDiscount = percentage(price, 10);
  return Math.round(price - (discount + personalDiscount));
}

function calcProductsPrice() {
  const productItems = document.querySelectorAll('.basket__item_type_current');
  const finalPriceText = document.querySelector('.basket__total-price');
  const totalAmountText = document.querySelector('.total__product-quantity');
  const amountBasket = document.querySelector('.navbar-pc__notify');
  const priceText = document.querySelector('.total__product-amounf');
  const discountText = document.querySelector('.total__discount-amounf');

  let totalPrice = 0;
  let totalAmount = 0;

  productItems.forEach(item => {
    const checkbox = item.querySelector('.checkbox');
    if (checkbox.checked) {
      const amount = item.querySelector('.count__text').value;
      const price = item.querySelector('.item-price__old_type_pc');
      const currentAmount = parseInt(amount);
      const currentPrice = parseInt(price.innerText);
      totalPrice += currentPrice;
      totalAmount += currentAmount;
    }
  });

  function textDeliveryButton() {
    if (buttonDelivery.textContent !== 'Заказать') {
      buttonDelivery.textContent = `Оплатить ${discountedPrice(totalPrice).toLocaleString(
        'ru'
      )} сом`;
    }
    checkboxPay.addEventListener('change', e => {
      const checked = e.target.checked;
      document.querySelectorAll('.payment__text').forEach(el => {
        if (checked) {
          buttonDelivery.textContent = `Оплатить ${discountedPrice(totalPrice).toLocaleString(
            'ru'
          )} сом`;
          return el.classList.add('payment__text_type_hidden');
        }
        buttonDelivery.textContent = 'Заказать';
        el.classList.remove('payment__text_type_hidden');
      });
    });
  }

  function counterHidden(basket) {
    if (totalAmount <= 1) {
      return basket.classList.add('navbar-pc__notify_type_hidden');
    }
    return basket.classList.remove('navbar-pc__notify_type_hidden');
  }
  finalPriceText.innerText = `${discountedPrice(totalPrice).toLocaleString('ru')}`;
  totalAmountText.innerText = `${totalAmount.toLocaleString('ru')} товара`;
  priceText.innerText = `${totalPrice.toLocaleString('ru')} сом`;
  discountText.innerText = `−${(totalPrice - discountedPrice(totalPrice)).toLocaleString(
    'ru'
  )} сом`;
  amountBasket.innerText = totalAmount;
  counterHidden(amountBasket);
  textDeliveryButton();
}
