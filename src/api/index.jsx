import axios from "axios";
import { getFromLocalStorage } from '../helpers/localstorage';

import envJson from '../env.json';

const getUrl = (customBase) => {
  const environment = window.location.hostname.includes('localhost') ? 'development' : 'production'
  const config = envJson[environment]

  switch (customBase) {
    case 'notification':
      return config.notification_path
    default:
      return config.base_path
  }
}

const api = async (method, rota, data, customBase) => {
  const token = getFromLocalStorage('authToken');
  const headers = {
    // withCredentials: true,
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}`  : undefined,
  };

  const baseURL = getUrl(customBase)

  try {
    let response;
    switch (method) {
      case "get":
        response = await axios.get(`${baseURL}${rota}`, { headers });
        break;
      case "post":
        response = await axios.post(`${baseURL}${rota}`, data, { headers });
        break;
      case "put":
        response = await axios.put(`${baseURL}${rota}`, data, { headers });
        break;
      case "delete":
        response = await axios.delete(`${baseURL}${rota}`, { headers });
        break;
      default:
        throw new Error("Invalid method");
    }
    return response;
  } catch (error) {
    console.log(error.response.data); /* TODO: Mudar o "console.log" para um Toast */
    throw error;
  }
};

export default api;