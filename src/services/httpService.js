import axios from 'axios';
import API_URL from '../config/api';

const HttpService = {
  async get(endpoint, params = '', withAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
      locale: localStorage.locale !== undefined ? localStorage.locale : 'en',
    };
    if (withAuth && localStorage.token !== undefined) {
      headers.Authorization = `Bearer ${localStorage.token}`;
    }
    if (params !== '') {
      endpoint += params;
    }
    return await axios
      .get(`${API_URL}/${endpoint}`, { headers })
      .then((response) => response);
  },

  async post(endpoint, body = {}, withAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };
    if (withAuth) {
      headers.Authorization = `Bearer ${localStorage.token}`;
    }
    return await axios
      .post(`${API_URL}/${endpoint}`, body, { headers })
      .then((response) => response);
  },
};

export default HttpService;
