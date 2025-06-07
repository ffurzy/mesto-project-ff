//открываем модальное окно
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
}

//закрываем модальное окно
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
}

//Закрываем модельно окно по оверлею
export function closeModalOverlay(popups) {
  popups.forEach(function (popup) {
    popup.addEventListener("mousedown", function (evt) {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
  });
}

//Закрываем модельное окно по Esc
export function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
