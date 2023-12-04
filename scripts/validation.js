const form = document.querySelector('.basket');

const inputName = form.querySelector('.recipient__input_type_name');
const inputSurname = form.querySelector('.recipient__input_type_surname');
const inputEmail = form.querySelector('.recipient__input_type_email');
const inputPhone = form.querySelector('.recipient__input_type_phone');
const inputInn = form.querySelector('.recipient__input_type_inn');

const errorName = form.querySelector('.recipient__input-error_type_name');
const errorSurname = form.querySelector('.recipient__input-error_type_surname');
const errorEmail = form.querySelector('.recipient__input-error_type_email');
const errorPhone = form.querySelector('.recipient__input-error_type_phone');
const errorInn = form.querySelector('.recipient__input-error_type_inn');

function validationCheckSubmit(input, error, textError) {
  if (input.value.length === 0) {
    error.innerText = textError;
    error.classList.add('error_hidden');
    input.focus();
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  validationCheckSubmit(inputInn, errorInn, 'Укажите ИНН');
  validationCheckSubmit(inputPhone, errorPhone, 'Укажите номер телефона');
  validationCheckSubmit(inputEmail, errorEmail, 'Укажите электронную почту');
  validationCheckSubmit(inputSurname, errorSurname, 'Введите фамилию');
  validationCheckSubmit(inputName, errorName, 'Укажите имя');
}

form.addEventListener('submit', handleFormSubmit);

function validationCheckInput(input, error) {
  input.addEventListener('input', evt => {
    evt.preventDefault();
    if (input.validity.valid) {
      error.classList.remove('error_hidden');
    }
  });
}

validationCheckInput(inputName, errorName);
validationCheckInput(inputSurname, errorSurname);
validationCheckInput(inputEmail, errorEmail);
validationCheckInput(inputPhone, errorPhone);
validationCheckInput(inputInn, errorInn);

inputEmail.addEventListener('blur', () => {
  if (inputEmail.value.length === 0) {
    // errorEmail.classList.remove('error_hidden');
  }
  if (!inputEmail.validity.valid) {
    errorEmail.innerText = 'Проверьте адрес электронной почты';
    errorEmail.classList.add('error_hidden');
  }
});

function getInputNumbersValue(input) {
  return input.value.replace(/\D/g, '');
}

function onPhoneInput(e) {
  const input = e.target;
  const inputNumbersValue = getInputNumbersValue(input);
  if (!inputNumbersValue) {
    return (input.value = '');
  }
  return (input.value = `+ ${inputNumbersValue}`);
}

inputPhone.addEventListener('input', onPhoneInput);
