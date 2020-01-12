import React, { createContext } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import AuthorsPage from './pages/AuthorsPage/AuthorsPage';
import { StylesProvider } from '@material-ui/core/styles';
import useFetchedData from './hooks/fetched-data.hook';
import authorService from './services/author.service';
import bookService from './services/book.service';
import Header from './components/Header/Header';
import BooksPage from './pages/BooksPage/BooksPage';

export const DataContext = createContext({});

const App = () => {
  const {
    data: authors,
    addItem: addAuthor
  } = useFetchedData(authorService.getAuthors);

  const {
    data: books,
    addItem: addBook,
  } = useFetchedData(bookService.getBooks);

  return (
    <DataContext.Provider value={{
      authors: { authors, addAuthor },
      books: { books, addBook },
    }}>
      <StylesProvider injectFirst>
        <Router>
          <Header/>
          <Switch>
            <Route path="/authors">
              <div className="wrap">
                <AuthorsPage authors={authors} addAuthor={addAuthor}/>
              </div>
            </Route>
            <Route path="/books">
              <div className="wrap">
                <BooksPage/>
              </div>
            </Route>
            <Route path="/" exact>
              <Redirect to="/authors"/>
            </Route>
            <Route path="*">
              <Redirect to="/authors"/>
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </DataContext.Provider>
  );
};

export default App;
