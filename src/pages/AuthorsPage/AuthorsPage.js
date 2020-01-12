import React, { useContext, useEffect, useState } from 'react';
import AuthorForm from '../../components/AuthorForm/AuthorForm';
import { uuid } from 'uuidv4';
import AppTable from '../../components/Table/AppTable';
import { DataContext } from '../../App';
import PreviewPopup from '../../components/PreviewPopup/PreviewPopup';
import useQuery from '../../hooks/query.hook'
import useFocusSelected from '../../hooks/focus-selected.hook';
import { Redirect } from 'react-router-dom';
import useItemsSearch from '../../hooks/items-search.hook';

const AuthorsPage = () => {
  const {
    authors: { authors, addAuthor },
    books: { books },
  } = useContext(DataContext);

  const [tableHead] = useState([
    { id: uuid(), label: 'Name', sortByField: 'name' },
    { id: uuid(), label: 'Description', sortByField: 'description' },
  ]);

  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState({});
  const [selectedAuthorBooks, setSelectedAuthorBooks] = useState([]);
  const [redirectTo, setRedirectTo] = useState();
  const [page, setPage] = useState(0);
  const queryParams = useQuery();
  const [searchValue, setSearchValue] = useState('');
  const searchedAuthors = useItemsSearch(
    authors,
    searchValue,
    'name',
    () => setPage(0)
  );

  const handleAuthorSelection = (authorId) => {
    const author = authors.find(author => author.author_id === authorId) || {};
    setSelectedAuthor(author);
    setIsPreviewPopupOpen(true);
    return author;
  };

  const handleBookSelection = (authorId) => {
    setRedirectTo(`/books?selected=${authorId}`);
  };

  const handleClose = () => {
    setIsPreviewPopupOpen(false);
  };

  useEffect(() => {
    setSelectedAuthorBooks(
      books.filter(book => book.author_id === selectedAuthor.author_id)
    );
  }, [books, selectedAuthor]);

  useFocusSelected(
    authors,
    queryParams,
    handleAuthorSelection,
    setPage,
    'author_id',
  );

  if (redirectTo) {
    return <Redirect to={redirectTo}/>
  }

  return (
    <>
      <AuthorForm onAuthorCreated={addAuthor}/>
      <AppTable rows={searchedAuthors}
                page={page}
                setPage={setPage}
                tableHead={tableHead}
                cellsList={['name', 'description']}
                idFieldName="author_id"
                selectedRowId={selectedAuthor.author_id}
                searchValue={searchValue}
                onSearch={(e) => setSearchValue(e.target.value)}
                onRowClick={handleAuthorSelection}/>
      <PreviewPopup open={isPreviewPopupOpen}
                    title={selectedAuthor.name}
                    subtitle={selectedAuthor.description}
                    idPropertyName="book_id"
                    textPropertyName="title"
                    list={selectedAuthorBooks}
                    listName="Books"
                    onListItemClick={handleBookSelection}
                    onClose={handleClose}/>
    </>
  );
};

export default AuthorsPage;
