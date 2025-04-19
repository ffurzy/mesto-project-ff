import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';

const cards = document.querySelector('.places__list');

initialCards.forEach(function(item) {
  const newCard = createCard(item, deleteCard);
  cards.append(newCard);
});