import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import authorService from '../../services/author.service';
import handleSubmit from '../../util/submit-handler.util';

const AuthorForm = ({ onAuthorCreated }) => {
  const [alertMessage, setAlertMessage] = useState();

  const authorForm = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: async (values) => {
      handleSubmit(
        authorForm,
        setAlertMessage,
        authorService.createAuthor.bind(null, values.name, values.description),
        onAuthorCreated,
      )
    }
  });

  return (
    <form onSubmit={authorForm.handleSubmit}
          className="form">
      { alertMessage && <h2 className={'text ' + alertMessage.className}>{alertMessage.text}</h2> }
      <TextField label="Name"
                 id="name"
                 name="name"
                 value={authorForm.values.name}
                 onChange={authorForm.handleChange}/>
      <TextField className="mt-10"
                 label="Description"
                 rowsMax={6}
                 multiline
                 id="description"
                 name="description"
                 value={authorForm.values.description}
                 onChange={authorForm.handleChange}/>
      <Button className="mt-10"
              variant="contained"
              color="primary"
              type="submit">
        Create
      </Button>
    </form>
  );
};

export default AuthorForm;
