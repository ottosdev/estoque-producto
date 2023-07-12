import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const productsApi = axios.create({
  baseURL: "http://localhost:3000/products/",
});

export const usersApi = axios.create({
  baseURL: "http://localhost:3000/users/",
});
