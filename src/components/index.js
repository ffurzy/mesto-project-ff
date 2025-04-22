import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';
import { openModal, closeModal, closeModalOverlay, closeModalEsc } from './modal.js';

const cards = document.querySelector('.places__list');
const AddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');



closeModalOverlay();
//открываем попап при нажатии на +

AddCard.addEventListener('click', function() {
  openModal(popupAddCard);
});

//находим все попапы с крестиками и вешаем на них closeModal
document.querySelectorAll('.popup__close').forEach(function(btn) {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', function() {
      closeModal(popup);
    });
});











initialCards.forEach(function(item) {
  const newCard = createCard(item, deleteCard);
  cards.append(newCard);
});