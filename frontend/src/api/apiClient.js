import axios from 'axios';
import { LocalStorageKeys } from '@/constants/LocalStorageKeys';

export const authorizedApiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': "application/json",
    Accept: `application/json`,
    Authorization: `Bearer ${localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)}`, // Beispiel
  },
});

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': "application/json",
    Accept: `application/json`,
  },
});

export const loginApiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': "application/x-www-form-urlencoded",
    Accept: `application/json`,
  },
});

// // src/axios.js oder src/api.js
// import axios from 'axios';
// import { LocalStorageKeys } from '@/constants/LocalStorageKeys';

// // Globale Defaults konfigurieren
// axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)}`; // Beispie
// axios.defaults.headers.common['Accept'] = `application/json`; // Beispiel
// axios.defaults.headers.post['Content-Type'] = "application/json";

// export default axios;
