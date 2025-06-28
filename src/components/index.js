//Импорты
import "../pages/index.css";
import { createCard, deleteCard as handleCardDelete, handleCardLike } from "./card.js";
import { openModal, closeModal, addCloseModalByOverlayListener } from "./modal.js";
import "core-js/stable";
import { enableValidation, validationConfig, clearValidation } from "./validation.js";
import { getInitialCards, getUserInfo, updateProfile, addNewCard, updateAvatar } from "./api.js";

enableValidation(validationConfig);

//Селекторы
const cardsContainer = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const profileEditBtn = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardForm = document.querySelector('form[name="new-place"]');
const placeInput = addCardForm.querySelector(".popup__input_type_card-name");
const linkInput = addCardForm.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup__image");
const popupImageOpen = document.querySelector(".popup_type_image");
const popupImageCaption = document.querySelector(".popup__caption");
const allPopups = document.querySelectorAll(".popup");
const newAvatarPic = document.querySelector(".popup_type_new_avatar");
const formNewAvatar = document.querySelector('form[name="new_avatar"]');
const inputNewAvatar = formNewAvatar.querySelector(
  ".popup__input_type_avatar-url"
);
const avatarImage = document.querySelector(".profile__image");
const profileAvatar = document.querySelector(".profile__image");
let currentUserId;

avatarImage.addEventListener("click", () => {
  console.log("formNewAvatar:", formNewAvatar);
  clearValidation(formNewAvatar, validationConfig);
  openModal(newAvatarPic);
});

//обновление аватара
formNewAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const button = formNewAvatar.querySelector(".popup__button");
  button.textContent = "Сохранение...";
  updateAvatar(inputNewAvatar.value)
    .then((data) => {
      avatarImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(newAvatarPic);
      formNewAvatar.reset();
    })
    .catch((error) => {
      console.log("Ошибка обновления аватара", error);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
});

addCloseModalByOverlayListener(allPopups);

//Отрытие большой карточки
function handleCardImageClick(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupImageCaption.textContent = card.name;
  openModal(popupImageOpen);
}

//редактирование профиля
editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const button = editProfileForm.querySelector(".popup__button");
  button.textContent = "Сохранение...";
  updateProfile(nameInput.value, aboutInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .finally(() => {
      button.textContent = "Сохранить";
      button.disabled = false;
      closeModal(editProfilePopup);
    })
    .catch((error) => {
      console.log("Ошибка при обновлении профиля", error);
    });
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const button = addCardForm.querySelector(".popup__button");
  button.textContent = "Сохранение...";
  const name = placeInput.value;
  const link = linkInput.value;
  
  addNewCard(name, link)
    .then((cardData) => {
      const cardElement = createCard( cardData, handleCardDelete, handleCardImageClick, handleCardLike, currentUserId );
      cardsContainer.prepend(cardElement);
      addCardForm.reset();
      closeModal(addCardPopup);
    })
    .catch((error) => {
      console.log("ошибка при создании карточки", error);
    });
}

//Слушатели
//На кнопку edit
profileEditBtn.addEventListener("click", function () {
  clearValidation(editProfileForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

addCardButton.addEventListener("click", function () {
  openModal(addCardPopup);
});

addCardForm.addEventListener("submit", handleAddCardFormSubmit);
document.querySelectorAll(".popup__close").forEach(function (btn) {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", function () {
    closeModal(popup);
  });
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    cards.reverse().forEach((cardData) => {
      const newCard = createCard( cardData, handleCardDelete, handleCardImageClick, handleCardLike, currentUserId );
      cardsContainer.append(newCard);
    });
  })
  .catch((error) => {
    console.log("Ошибка", error);
  });
