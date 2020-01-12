import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import handleSubmit from '../../util/submit-handler.util';
import bookService from '../../services/book.service';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DataContext } from '../../App';
import AppSelect from '../AppSelect/AppSelect';

const BookForm = ({ onBookCreated }) => {
  const {
    authors: { authors },
  } = useContext(DataContext);

  const [alertMessage, setAlertMessage] = useState();

  const bookForm = useFormik({
    initialValues: {
      title: '',
      genre: '',
      authorId: '',
      description: '',
      rating: '',
    },
    onSubmit: async (values) => {
      handleSubmit(
        bookForm,
        setAlertMessage,
        bookService.createBook.bind(
          null,
          values.title,
          values.genre,
          values.description,
          values.authorId,
          values.rating,
        ),
        onBookCreated,
      )
    }
  });

  return (
    <form onSubmit={bookForm.handleSubmit}
          className="form">
      {alertMessage && <h2 className={'text ' + alertMessage.className}>{alertMessage.text}</h2>}
      <TextField label="Title"
                 id="title"
                 name="title"
                 value={bookForm.values.title}
                 onChange={bookForm.handleChange}/>
      <TextField className="mt-10"
                 label="Genre"
                 id="genre"
                 name="genre"
                 value={bookForm.values.genre}
                 onChange={bookForm.handleChange}/>
      <TextField className="mt-10"
                 label="Description"
                 rowsMax={6}
                 multiline
                 id="description"
                 name="description"
                 value={bookForm.values.description}
                 onChange={bookForm.handleChange}/>
      <AppSelect label="Author"
                 className="mt-10"
                 id="authorId"
                 name="authorId"
                 value={bookForm.values.authorId}
                 onChange={bookForm.handleChange}
                 items={authors}
                 idFieldName="author_id"
                 textFieldName="name"/>
      <TextField className="mt-10"
                 type="number"
                 label="Rating"
                 id="rating"
                 name="rating"
                 value={bookForm.values.rating}
                 onChange={bookForm.handleChange}
                 inputProps={{min: 0, max: 5}}/>
      <Button className="mt-10"
              variant="contained"
              color="primary"
              type="submit">
        Create
      </Button>
    </form>
  );
};

export default BookForm;
