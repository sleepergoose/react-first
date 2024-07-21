import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { snakeCaseToNormalString } from '../../helpers/case-transform.js';
import { isEmpty } from 'lodash';

const FormSelect = ({
  name,
  label,
  register,
  errors,
  options,
  variant = 'standard',
}) => {
  const [productTimeValue, setProductTypeValue] = useState('');

  const onChangeType = (event) => {
    setProductTypeValue(event.target.value);
  };

  return (
    <div className="height">
      <FormControl fullWidth size="small" variant={variant}>
        <InputLabel id="type-select-label">{label}</InputLabel>
        <Select
          labelId="type-select-label"
          value={productTimeValue}
          label={label}
          name={name}
          {...{
            ...register,
            onChange: (e) => onChangeType(e),
          }}
        >
          {!isEmpty(options) &&
            options.map((type) => (
              <MenuItem key={type} value={type}>
                {snakeCaseToNormalString(type)}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {errors[name]?.type === 'required' && (
        <span role="alert">{errors[name].message}</span>
      )}
    </div>
  );
};

export default FormSelect;
