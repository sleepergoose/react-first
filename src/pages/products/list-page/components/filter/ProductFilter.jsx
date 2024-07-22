import './ProductFilter.css';
import { isArray, isEmpty } from 'lodash';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { snakeCaseToNormalString } from '../../../../../helpers/case-transform';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const ProductFilter = ({ filters, handleFilter }) => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    values[name] = value;
    setValues({ ...values });
  };

  const handleApplyClick = () => {
    if (handleFilter && isArray(filters)) {
      const queryQueryParams = filters
        .map((filter) =>
        (!isEmpty(values[filter.type])
          ? `&${filter.type}=${values[filter.type].join(`&${filter.type}=`)}`
          : '')
        )
        .filter((v) => !!v)
        .join('');

      handleFilter(queryQueryParams);
    }
  };

  const handleClearAllClick = () => {
    setValues({});
    handleFilter('');
  };

  useEffect(() => {
    const initValues = {};

    if (isArray(filters)) {
      filters.forEach((filter) => {
        initValues[filter.type] = filter.selected;
      });
    }

    setValues({ ...initValues });
  }, [filters]);

  return (
    <div className="filter">
      {isArray(filters) &&
        !isEmpty(filters) &&
        filters.map((filter) => (
          <FormControl
            sx={{ maxWidth: 200, minWidth: 150, fontSize: 12 }}
            size="small"
            key={filter.type}
          >
            <InputLabel sx={{ fontSize: 12 }}>{filter.label}</InputLabel>
            <Select
              sx={{ fontSize: 12 }}
              label={filter.label}
              value={values[filter.type] ?? []}
              name={filter.type}
              multiple
              renderValue={(selected) =>
              (selected.length > 1
                ? 'Multiple'
                : snakeCaseToNormalString(selected[0]))
              }
              onChange={handleChange}
            >
              {isArray(filter.options) &&
                !isEmpty(filter.options) &&
                filter.options.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      maxHeight: 40,
                    }}
                  >
                    <Checkbox
                      checked={
                        isArray(values[filter.type]) &&
                        values[filter.type].indexOf(option) > -1
                      }
                    />
                    <ListItemText
                      size="small"
                      primary={snakeCaseToNormalString(option)}
                    />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        ))}

      <Button size="medium" onClick={handleApplyClick}>
        Apply
      </Button>
      <Button size="medium" onClick={handleClearAllClick}>
        Clear All
      </Button>
    </div>
  );
};

export default ProductFilter;
