const handleSubmit = async (form, setAlertMessage, request, cb) => {
  if (Object.values(form.values).some(value => !value)) {
    debugger
    return;
  }

  try {
    setAlertMessage({ text: 'Loading...', className: 'text-info' });
    const { data } = await request();
    form.resetForm();
    setAlertMessage({ text: 'Success!', className: 'text-success' });
    cb(data);
  } catch {
    setAlertMessage({ text: 'Error!', className: 'text-danger' });
  }
};

export default handleSubmit;
