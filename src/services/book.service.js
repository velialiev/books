import apiService from './api.service';
import API_URLS from '../constants/api-urls.constant';
import generateUrl from '../util/url-generator.util';

const createBook = (title, genre, description, authorId, rating) => {
  return apiService.post(
    API_URLS.BOOK,
    {
      title,
      genre,
      description,
      author_id: authorId,
      rating,
    },
  );
};

const getBooks = () => {
  return apiService.get(API_URLS.BOOK);
};

const getBookById = (id) => {
  return apiService.get(
    generateUrl(API_URLS.BOOK_BY_ID, { id }),
  );
};

const editBook = (id, description) => {
  return apiService.put(
    generateUrl(API_URLS.BOOK_BY_ID, { id }),
    { description },
  )
};

const deleteBook = (id) => {
  return apiService.delete(
    generateUrl(API_URLS.BOOK_BY_ID, { id }),
  );
};

const bookService = {
  createBook,
  getBooks,
  getBookById,
  editBook,
  deleteBook,
};

export default bookService;
