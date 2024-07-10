import axios from "axios";
import { getFromLocalStorage } from '../helpers/localstorage';
import Swal from 'sweetalert2';

import envJson from '../env.json';

const getUrl = (serviceType = 'default') => {
  const environment = window.location.hostname.includes('localhost') ? 'development' : 'production'
  const config = envJson[environment]

  const servicePaths = {
    notification: config.notification_path,
    default: config.base_path,
  };

  return servicePaths[serviceType] || servicePaths.default;
}

const api = async (method, path, data, serviceType = 'default') => {
  const token = getFromLocalStorage('authToken');
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  };

  const baseURL = getUrl(serviceType)

  try {
    const url = `${baseURL}${path}`;
    const options = { headers };

    const response = await axios({ method, url, data, ...options });

    return response;
  } catch (error) {
    console.log('error', error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: (error.response.data.error || error.message) || 'Algo deu errado!',
    });

    throw error;
  }
};

export default api;