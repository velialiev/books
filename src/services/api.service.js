import axios from 'axios';

const baseURL = 'http://localhost:8080/api/';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use((response) => {
  return response.data;
});

const get = (url) => {
  return axiosInstance.get(url);
};

const post = (url, body) => {
  return axiosInstance.post(url, body);
};

const put = (url, partialBody) => {
  return axiosInstance.put(url, partialBody);
};

const apiService = {
  get,
  post,
  put,
};

export default apiService;
