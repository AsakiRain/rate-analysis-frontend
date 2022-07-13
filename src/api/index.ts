import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.timeout = 1000 * 10;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const apiGet = (path: string, params?: object, config?: object) => {
  return axios.get(path, { params, ...config });
};

export const apiPost = (path: string, data?: object, config?: object) => {
  return axios.post(path, data, config);
};
