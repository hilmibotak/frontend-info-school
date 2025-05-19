// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // GANTI sesuai alamat backend kamu
});

export default API;
