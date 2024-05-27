import axios from "axios";

import envJson from '../env.json';

export const baseURL = (window.location.hostname === 'localhost')
  ? (envJson.development.base_path)
  : (envJson.production.base_path)

const api = async (method, rota, data) => {
  const headers = {
    // withCredentials: true,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  try {
    let response;
    switch (method) {
      case "get":
        response = await axios.get(`${baseURL}${rota}`, headers);
        break;
      case "post":
        response = await axios.post(`${baseURL}${rota}`, data, headers);
        break;
      case "put":
        response = await axios.put(`${baseURL}${rota}`, data, headers);
        break;
      case "delete":
        response = await axios.delete(`${baseURL}${rota}`, headers);
        break;
      default:
        throw new Error("Invalid method");
    }
    return response;
  } catch (error) {
    console.log(error.response.data); // Mudar posteriormente para Toast
    throw error;
  }
};

export default api;
