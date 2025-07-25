import { checkResponse } from "./Api";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.majorpain.net.technoWizard.com"
    : "http://localhost:3001";

export function getToken() {
  return localStorage.getItem("jwt");
}

export function login({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .catch(console.error)
    .then(checkResponse);
}

export function signUp({ email, avatar, name, password }) {
  console.log(email, avatar, name, password);
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, avatar, name, password }),
  })
    .catch(console.error)
    .then(checkResponse);
}

export function updateUser({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ avatar, name }),
  })
    .catch(console.error)
    .then(checkResponse);
}

export function getCurrentUser() {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  })
    .catch(console.error)
    .then(checkResponse);
}
