import { deleteCardFromServer, likeCard, unlikeCard } from "./api.js";

//коллбек для лайка
export function handleCardLike(likeBtn, cardId, likeCount) {
  const liked = likeBtn.classList.contains("card__like-button_is-active");

  if (liked) {
    unlikeCard(cardId)
      .then((updatedCard) => {
        likeBtn.classList.remove("card__like-button_is-active");
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch((error) => {
        console.log("Ошибка при удалении лайка:", error);
      });
  } else {
    likeCard(cardId)
      .then((updatedCard) => {
        likeBtn.classList.add("card__like-button_is-active");
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch((error) => {
        console.log("Ошибка при лайке:", error);
      });
  }
}

//создание карточки
export function createCard( card, deleteCard, openImageClick, addLike, currentUserId ) {
  const templateItems = document.querySelector("#card-template").content;
  const templateCard = templateItems.querySelector(".card").cloneNode(true);
  const likeCount = templateCard.querySelector(".card__like-count");
  const cardImage = templateCard.querySelector(".card__image");
  templateCard.querySelector(".card__title").textContent = card.name;
  const deleteButton = templateCard.querySelector(".card__delete-button");

  if (card.owner._id === currentUserId) {
    deleteButton.addEventListener("click", () => {
      deleteCardFromServer(card._id)
        .then(() => {
          deleteCard(templateCard);
        })
        .catch((err) => {
          console.log("Ошибка при удалении:", err);
        });
    });
  } else {
    deleteButton.remove();
  }
  cardImage.src = card.link;
  cardImage.alt = card.name;
  const likeBtn = templateCard.querySelector(".card__like-button");
  likeCount.textContent = card.likes.length;
  likeBtn.addEventListener("click", function () {
    addLike(likeBtn, card._id, likeCount);
  });

  cardImage.addEventListener("click", function () {
    openImageClick(card);
  });
  return templateCard;
}

//удаление карточки
export function deleteCard(cardElement) {
  if (cardElement) {
    cardElement.remove();
  }
}