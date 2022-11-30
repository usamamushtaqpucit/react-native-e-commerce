import baseURL from "./base-url";
import axios from "axios";

export const httpLoginUser = async (user) => {
  const response = await axios.post(`${baseURL}users/login`, user, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const httpRegisterUser = async (user) => {
  const response = await axios.post(`${baseURL}users/register`, user, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const httpGetUserProfile = async (id, token) => {
  const response = await axios.get(`${baseURL}users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
