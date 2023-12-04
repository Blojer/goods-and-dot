const checkboxMain = document.querySelector('.chekbox_type_all');

checkboxMain.addEventListener('change', e => {
  const checked = e.target.checked;
  document.querySelectorAll('.checkbox_type_product').forEach(el => {
    el.checked = checked;
  });
  calcProductsPrice();
});

document.querySelector('.basket__items').addEventListener('change', e => {
  const allchecksLen = document.querySelectorAll('.checkbox_type_product').length;
  const selectedChecksLen = document.querySelectorAll('.checkbox_type_product:checked').length;
  const main = document.querySelector('.chekbox_type_all');
  main.checked = selectedChecksLen === allchecksLen;
});

const acc = document.querySelectorAll('.accordion');
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    let panel = this.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}
