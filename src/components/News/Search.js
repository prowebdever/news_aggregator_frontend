import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

const Search = (props) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    props.searchNews(search);
  };

  return (
    <TextField
      label="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button variant="outlined" onClick={handleSearch}>
              Search
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
