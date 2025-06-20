//Импорты
import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard as handleCardDelete, handleCardLike} from "./card.js";
import {
  openModal,
  closeModal,
  addCloseModalByOverlayListener,
  closeModalEsc,
} from "./modal.js";
import "core-js/stable";
import { enableValidation, validationConfig } from "./validation.js";

enableValidation(validationConfig);



//Селекторы
const cardsContainer = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const profileEditBtn = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardForm = document.querySelector('form[name="new-place"]');
const placeInput = addCardForm.querySelector(".popup__input_type_card-name");
const linkInput = addCardForm.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup__image");
const popupImageOpen = document.querySelector(".popup_type_image");
const popupImageCaption = document.querySelector(".popup__caption");
const allPopups = document.querySelectorAll(".popup");
addCloseModalByOverlayListener(allPopups);


//Отрытие большой карточки
function handleCardImageClick(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupImageCaption.textContent = card.name;
  openModal(popupImageOpen);
}

//редактирование профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

//Создание карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeInput.value,
    link: linkInput.value,
  };

  //добавление карточки в начало списка
  const cardElement = createCard(
    cardData,
    handleCardDelete,
    handleCardImageClick,
    handleCardLike
  );
  cardsContainer.prepend(cardElement);
  addCardForm.reset();
  closeModal(addCardPopup);
}

initialCards.forEach(function (item) {
  const newCard = createCard(
    item,
    handleCardDelete,
    handleCardImageClick,
    handleCardLike
  );
  cardsContainer.append(newCard);
});

//Слушатели
//На кнопку edit
profileEditBtn.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

//на плюсик
addCardButton.addEventListener("click", function () {
  openModal(addCardPopup);
});
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//вешаем на крестики closeModal
document.querySelectorAll(".popup__close").forEach(function (btn) {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", function () {
    closeModal(popup);
  });
});
