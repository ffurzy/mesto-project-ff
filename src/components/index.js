import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';
import { openModal, closeModal, closeModalOverlay, closeModalEsc } from './modal.js';
import "core-js/stable";



const cards = document.querySelector('.places__list');
const addCardBtn = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');


const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formAdd = document.querySelector('form[name="new-place"]');
const placeInput  = formAdd.querySelector('.popup__input_type_card-name');
const linkInput   = formAdd.querySelector('.popup__input_type_url');

//открытие больших картинок
const popupImage = document.querySelector('.popup__image');
const popupImageOpen = document.querySelector('.popup_type_image');
const popupImageCaption = document.querySelector('.popup__caption');






closeModalOverlay();

//открываем попап при нажатии на +
addCardBtn.addEventListener('click', function() {
  openModal(popupAddCard);
});

//вешаем слушатель на кнопку edit
profileEditBtn.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value  = profileDescription.textContent;
  openModal(popupEdit);
});


//находим все попапы с крестиками и вешаем на них closeModal
document.querySelectorAll('.popup__close').forEach(function(btn) {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', function() {
      closeModal(popup);
    });
});




//Отрытие большой карточки

function openPopupImage(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupImageCaption.textContent = card.name;
  openModal(popupImageOpen);
}

initialCards.forEach(function(item) {
  const newCard = createCard(item, deleteCard, openPopupImage);
  cards.append(newCard);
});


//редактирование профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent       = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}
formElement.addEventListener('submit', handleFormSubmit); 

//Создание карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  
  const cardData = {
    name: placeInput.value,
    link: linkInput.value
  };

  //добавление карточки в начало списка

  const cardElement = createCard(cardData, deleteCard, openPopupImage);
  cards.prepend(cardElement);

  
  formAdd.reset();
  closeModal(popupAddCard);
}
formAdd.addEventListener('submit', handleAddFormSubmit);