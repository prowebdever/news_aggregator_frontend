import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';

const Search = (props) => {
  const [search, setSearch] = useState('');

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Search"
        value={search}
        onChange={(e) => { setSearch(e.target.value); }}
      />
      <Button variant="outline-secondary" id="button-addon2" onClick={() => { props.searchNews(search); }}>
        Search
      </Button>
    </InputGroup>
  );
};

export default Search;
