// включение валидации вызовом enableValidation
// все настройки передаются при вызове



export const validationConfig = {
  formSelector: '.popup__form',             
  inputSelector: '.popup__input',           
  submitButtonSelector: '.popup__button',   
  inactiveButtonClass: 'popup__button_disabled',  
  inputErrorClass: 'popup__input_type_error',     
  errorClass: 'popup__error_visible'  
};

//Показ ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass); 
};

//Скрытие ошибки
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  } 
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config)
  }
};

// отключаем кнопку
const disableSubmitButton = (button, config) => {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
};

// включаем кнопку
const enableSubmitButton = (button, config) => {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

//Слушаем поля всех форм

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    

    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, config);
    } else {
        enableSubmitButton(buttonElement, config);
    }
};


export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement, config);
  });

  disableSubmitButton(buttonElement, config);
}



//Добавление обработчиков всем формам

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};








