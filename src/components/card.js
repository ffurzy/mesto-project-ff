export function createCard(card, deleteCard) {
  const templateItems = document.querySelector('#card-template').content;
  const templateCard = templateItems.querySelector('.card').cloneNode(true);
  const cardImage = templateCard.querySelector('.card__image');
  templateCard.querySelector('.card__title').textContent = card.name;
  templateCard.querySelector('.card__delete-button').addEventListener("click", deleteCard);
  cardImage.src = card.link;
  cardImage.alt = card.name;
  return templateCard;
};

export function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  if (cardToDelete) {
    cardToDelete.remove();
  }
};