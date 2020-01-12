import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const AppSelect = (
  {
    label,
    items = [],
    idFieldName = 'id',
    textFieldName = 'text',
    value,
    onChange,
    className,
    ...rest
  }
) => {
  return (
    <FormControl className={className}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        {...rest}
      >
        {items.map(item => (
          <MenuItem key={item[idFieldName]}
                    value={item[idFieldName]}>
            {item[textFieldName]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AppSelect;
