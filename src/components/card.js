export function createCard(card, deleteCard, openImageClick) {
  const templateItems = document.querySelector('#card-template').content;
  const templateCard = templateItems.querySelector('.card').cloneNode(true);

  const cardImage = templateCard.querySelector('.card__image');
  templateCard.querySelector('.card__title').textContent = card.name;
  templateCard.querySelector('.card__delete-button').addEventListener("click", deleteCard);
  cardImage.src = card.link;
  cardImage.alt = card.name;
  

  //ставим лайк
  const likeBtn = templateCard.querySelector('.card__like-button');
  likeBtn.addEventListener('click', function() {
    likeBtn.classList.toggle('card__like-button_is-active');
  });

  //открытие изоображения
  cardImage.addEventListener('click', function() {
    openImageClick(card);
  });

  return templateCard;
};

export function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  if (cardToDelete) {
    cardToDelete.remove();
  }
};