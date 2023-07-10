const authApiUrl = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${authApiUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => res.json());
};

export const login = (password, email) => {
  return fetch(`${authApiUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => res.json());
};

export const getContent = (token) => {
  return fetch(`${authApiUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
