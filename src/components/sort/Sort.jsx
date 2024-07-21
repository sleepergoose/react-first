import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState, memo } from 'react';

const SortComponent = ({ handleChange, currentValue, sortOptions }) => {
  if (!sortOptions) {
    throw new Error('Sort options are not specified.');
  }

  const [sortOptionValue, setSortOptionValue] = useState(
    currentValue ?? sortOptions[0].value
  );

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSortOptionValue(newValue);

    if (handleChange) {
      handleChange(newValue);
    }
  };

  return (
    <>
      <div className="filter-container">
        <FormControl sx={{ minWidth: 150, fontSize: 12 }} size="small">
          <InputLabel sx={{ fontSize: 12 }}>Sort By</InputLabel>
          <Select
            sx={{ fontSize: 12 }}
            value={sortOptionValue}
            label="Sort By"
            onChange={handleSelectChange}
          >
            {sortOptions.map((item) => (
              <MenuItem
                key={item.value}
                sx={{ fontSize: 12 }}
                value={item.value}
              >
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

const Sort = memo(SortComponent);

export default Sort;
