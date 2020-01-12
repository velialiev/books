import apiService from './api.service';
import API_URLS from '../constants/api-urls.constant';
import generateUrl from '../util/url-generator.util';

const createAuthor = (name, description) => {
  return apiService.post(
    API_URLS.AUTHOR,
    { name, description },
  );
};

const getAuthors = () => {
  return apiService.get(API_URLS.AUTHOR);
};

const getAuthorById = (id) => {
  return apiService.get(
    generateUrl(API_URLS.AUTHOR_BY_ID, { id }),
  );
};

const editAuthor = (id, description) => {
  return apiService.put(
    generateUrl(API_URLS.AUTHOR_BY_ID, { id }),
    { description },
  )
};

const deleteAuthor = (id) => {
  return apiService.delete(
    generateUrl(API_URLS.AUTHOR_BY_ID, { id }),
  );
};

const authorService = {
  createAuthor,
  getAuthors,
  getAuthorById,
  editAuthor,
  deleteAuthor,
};

export default authorService;
