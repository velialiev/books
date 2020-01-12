import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popup from '../Popup/Popup';
import styles from './PreviewPopup.module.scss';

const PreviewPopup = (
  {
    open,
    title,
    subtitle,
    list,
    listName,
    onListItemClick = () => {
    },
    onClose,
    idPropertyName = 'id',
    textPropertyName = 'text'
  }
) => {
  return (
    <Popup title={title} open={open} onClose={onClose}>
      {subtitle && <Typography style={{ padding: '0 15px' }} align="justify" variant="subtitle1">
        {subtitle}
      </Typography>}
      {listName && <h3 className={'mt-10 ' + styles.subtitle}>{listName}:</h3>}
      {
        list && list.length ?
          <List>
            {list.map(listItem => (
              <ListItem key={listItem[idPropertyName]}
                        onClick={() => onListItemClick(listItem[idPropertyName])}
                        button>
                <ListItemText primary={listItem[textPropertyName]}/>
              </ListItem>
            ))}
          </List> :
          <Typography style={{ padding: '0 15px' }} align="justify" variant="subtitle1">
            No data
          </Typography>
      }
    </Popup>
  );
};

export default PreviewPopup;
