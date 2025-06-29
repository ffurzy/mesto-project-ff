[Ссылка на деплой](https://ffurzy.github.io/mesto-project-ff/)

## 6/28/25 Правки после первого ревью

1. Переместил validationConfig в index.js

2. Переместил закрытие попапа в .then

```
 updateProfile(nameInput.value, aboutInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfilePopup);
    })
    .finally(() => {
      button.textContent = "Сохранить";
      button.disabled = false;
    })
```

3. Поправил активную кнопку добавлением метода finally в функцию handleAddCardFormSubmit и clearValidation в обработчик

```
    .finally(() => {
      button.textContent = "Сохранить";
      button.disabled = true;
    })


-------
    addCardButton.addEventListener("click", function () {
    clearValidation(addCardForm, validationConfig);
    openModal(addCardPopup);
});

```

4. > При загрузке карточек на них не отображаются собственные лайки.

пытался 5 часов реализовать через функции с лайками. Только потом понял что нужно отрисовывать при подгрузке карточек

5. Убрал все console.log
