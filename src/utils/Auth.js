/* eslint-disable import/prefer-default-export */

const BASE_URL = 'https://auth.nomoreparties.co';
function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((data) => {
    throw new Error(data.message);
  });
}

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then(checkResponse);
}

export function authorize(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then(checkResponse);
}

export function getContent(userToken) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${userToken}`
    }
  }).then(checkResponse);
}
