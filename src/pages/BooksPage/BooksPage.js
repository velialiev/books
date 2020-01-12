import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../App';
import BookForm from '../../components/BookForm/BookForm';
import AppTable from '../../components/Table/AppTable';
import { uuid } from 'uuidv4';
import PreviewPopup from '../../components/PreviewPopup/PreviewPopup';
import { Redirect } from 'react-router-dom';
import useQuery from '../../hooks/query.hook';
import useFocusSelected from '../../hooks/focus-selected.hook';
import useItemsSearch from '../../hooks/items-search.hook';

const BooksPage = () => {
  const {
    authors: { authors },
    books: { books, addBook },
  } = useContext(DataContext);

  const [tableHead] = useState([
    { id: uuid(), label: 'Title', sortByField: 'title' },
    { id: uuid(), label: 'Genre', sortByField: 'genre' },
    { id: uuid(), label: 'Author', sortByField: 'author.name' },
    { id: uuid(), label: 'Description', sortByField: 'description' },
    { id: uuid(), label: 'Rating', sortByField: 'rating' },
  ]);

  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [selectedBookAuthors, setSelectedBookAuthors] = useState([]);
  const [redirectTo, setRedirectTo] = useState();
  const [page, setPage] = useState(0);
  const queryParams = useQuery();
  const [searchValue, setSearchValue] = useState('');
  const searchedBooks = useItemsSearch(
    books,
    searchValue,
    'title',
    () => setPage(0)
  );

  const handleBookSelection = (bookId) => {
    const book = books.find(book => book.book_id === bookId) || {};
    setSelectedBook(book);
    setIsPreviewPopupOpen(true);
    return book;
  };

  const addBookWithAuthor = (item) => {
    const book = {
      ...item,
      author: authors.find(author => author.author_id === item.author_id),
    };

    addBook(book);
  };

  const handleClose = () => {
    setIsPreviewPopupOpen(false);
  };

  const handleAuthorSelection = (authorId) => {
    setRedirectTo(`/authors?selected=${authorId}`);
  };

  useEffect(() => {
    setSelectedBookAuthors(
      authors.filter(author => author.author_id === selectedBook.author_id)
    );
  }, [selectedBook, authors]);

  useFocusSelected(
    books,
    queryParams,
    handleBookSelection,
    setPage,
    'book_id',
  );

  if (redirectTo) {
    return <Redirect to={redirectTo}/>
  }

  return (
    <>
      <BookForm onBookCreated={addBookWithAuthor}/>
      <AppTable rows={searchedBooks}
                page={page}
                setPage={setPage}
                tableHead={tableHead}
                cellsList={['title', 'genre', 'author.name', 'description', 'rating']}
                idFieldName="book_id"
                selectedRowId={selectedBook.book_id}
                searchValue={searchValue}
                onSearch={(e) => setSearchValue(e.target.value)}
                onRowClick={handleBookSelection}/>
      <PreviewPopup open={isPreviewPopupOpen}
                    title={selectedBook.title}
                    subtitle={selectedBook.description}
                    idPropertyName="author_id"
                    textPropertyName="name"
                    list={selectedBookAuthors}
                    listName="Authors"
                    onListItemClick={handleAuthorSelection}
                    onClose={handleClose}/>
    </>
  );
};

export default BooksPage;
