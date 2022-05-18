import React from 'react'

class Api extends React.Component {
  constructor(props) {
    super(props)
    this.baseUrl = props.baseUrl;
    this.headers = props.headers;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialData() {
    return Promise.all([this.getUserData(), this.getInitialCards()])
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => this._handleResponse(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => this._handleResponse(res));
  }

  setUserData(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._handleResponse(res));
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._handleResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(cardId, cardIsLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: cardIsLiked ? 'PUT' : 'DELETE',
      headers: this.headers
    })
    .then(res => this._handleResponse(res));
  }

  changeAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: `${data.link}`,
      }),
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "db8791fd-f46d-4615-b308-f5256d937c0b",
    "Content-Type": "application/json",
  },
});

export default api;