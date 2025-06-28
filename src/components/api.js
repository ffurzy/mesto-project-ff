// Конфиг для подставления токена
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "843e62ef-d523-47ed-8c6d-a1b7826cf46d",
    "Content-Type": "application/json",
  },
};

// Проверяем ответ
export const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(handleResponse)
};

//Получение инфы пользователей
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(handleResponse)
};

//Редактирование профиля
export const updateProfile = (name, about) => {
  console.log("Данные перед отправкой:", { name, about });
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(handleResponse)
};

// Добавление новой карточки на сервер
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(handleResponse)
};

//удаление карточки
export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
};

// Ставим лайк
export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(handleResponse)
};

//Убираем лайк
export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
};

// Обновление аватара пользователя
export const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link, //
    }),
  }).then(handleResponse);
};
