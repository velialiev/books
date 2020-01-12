import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const Popup = ({ onClose, open, children, title }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      {title && <DialogTitle>{title}</DialogTitle>}
      { children }
    </Dialog>
  );
};

export default Popup;
