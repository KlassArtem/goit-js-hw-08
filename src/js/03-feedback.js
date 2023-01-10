import throttle from 'lodash.throttle';

const refForm = document.querySelector('.feedback-form');

let dataForm = {};
const FORM_CURRENT_VALUE = 'feedback-form-state';

refForm.addEventListener('submit', handleFormSubmit);
refForm.addEventListener('input', throttle(handleFormInputValue, 500));

getFormDataFromStorage();

function handleFormSubmit(event) {
  event.preventDefault();

  const formLength = event.currentTarget.elements.length - 1;

  if (Object.keys(dataForm).length !== formLength) {
    alert('Fill all fields');
    return;
  }

  event.currentTarget.reset();

  localStorage.removeItem(FORM_CURRENT_VALUE);

  console.log(dataForm);
  dataForm = {};
}

function handleFormInputValue(event) {
  dataForm[event.target.name] = event.target.value.trim();

  const stringifyFormData = JSON.stringify(dataForm);

  localStorage.setItem(FORM_CURRENT_VALUE, stringifyFormData);
}

function getFormDataFromStorage() {
  const savedMessage = localStorage.getItem(FORM_CURRENT_VALUE);

  if (savedMessage) {
    try {
      dataForm = JSON.parse(savedMessage);

      Object.entries(dataForm).forEach(
        ([name, value]) => (refForm.elements[name].value = value)
      );
    } catch (err) {
      console.log(err.message);
    }
  }
}
