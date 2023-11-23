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
      const price = item.querySelector('.item-price__old');
      const currentAmount = parseInt(amount);
      const currentPrice = parseInt(price.innerText);
      totalPrice += currentPrice;
      totalAmount += currentAmount;
    }
  });

  finalPriceText.innerText = `${discountedPrice(totalPrice).toLocaleString('ru')}`;
  totalAmountText.innerText = `${totalAmount.toLocaleString('ru')} товара`;
  priceText.innerText = `${totalPrice.toLocaleString('ru')} сом`;
  discountText.innerText = `−${(totalPrice - discountedPrice(totalPrice)).toLocaleString(
    'ru'
  )} сом`;
  amountBasket.innerText = `${totalAmount.toLocaleString('ru')}`;
}
