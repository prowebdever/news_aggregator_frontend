import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  Header, Container, card, selectStyle, DateStyle, formButton
} from './style';
import HttpService from '../../services/httpService';

const Filter = (props) => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filterSources, setFilterSources] = useState('');
  const [filterCategories, setFilterCategories] = useState('');
  const [filterAuthors, setFilterAuthors] = useState('');
  const [filterString, setFilterString] = useState('');
  const [date, setDate] = useState('');

  const filterData = () => {
    setFilterString(`source_id=${filterSources}&category=${filterCategories}&author=${filterAuthors}&date=${date}`);
    props.setFilter(filterString);
  };

  const selectSource = (e) => {
    console.log(filterSources);
    setFilterSources([].slice.call(e.target.selectedOptions).map((item) => item.value));
  };

  const fetchFilterData = () => {
    try {
      HttpService.get(
        'news/filters',
        '',
        true
      ).then((response) => {
        const parsedData = response.data.data;
        setCategories(parsedData.categories);
        setAuthors(parsedData.authors);
        const preferredSources = parsedData.preferred_sources.split(',');
        const preferredCategories = parsedData.preferred_categories.split(',');
        const preferredAuthors = parsedData.preferred_authors.split(',');
        if (parsedData.preferred_sources) { setFilterSources(preferredSources); }
        if (parsedData.preferred_categories) { setFilterCategories(preferredCategories); }
        if (parsedData.preferred_authors) { setFilterAuthors(preferredAuthors); }
        setFilterString(`source_id=${preferredSources}&category=${preferredCategories}&author=${preferredAuthors}&date=${date}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filterString]);

  return (
    <Container>
      <Row>
        <Col
          sm={12}
          md={3}
          lg={3}
          xl={3}
        >
          <Form.Label style={{ color: '#fff' }}>Select Source</Form.Label>
          <Form.Select multiple aria-label="Default select example" style={selectStyle} onChange={(e) => selectSource(e)}>
            <option value="1" selected={filterSources.includes('1')}>news api</option>
            <option value="2" selected={filterSources.includes('2')}>the guardian</option>
            <option value="3" selected={filterSources.includes('3')}>new york times</option>
          </Form.Select>
        </Col>
        <Col
          sm={12}
          md={3}
          lg={3}
          xl={3}
        >
          <Form.Label style={{ color: '#fff' }}>Select Category</Form.Label>
          <Form.Select multiple aria-label="Default select example" style={selectStyle} onChange={(e) => setFilterCategories([].slice.call(e.target.selectedOptions).map((item) => item.value))}>
            {categories.map((category) => <option key={category} value={category} selected={filterCategories.includes(category)}>{category}</option>) }
          </Form.Select>
        </Col>
        <Col
          sm={12}
          md={3}
          lg={3}
          xl={3}
        >
          <Form.Label style={{ color: '#fff' }}>Select Author</Form.Label>
          <Form.Select multiple aria-label="Default select example" style={selectStyle} onChange={(e) => setFilterAuthors([].slice.call(e.target.selectedOptions).map((item) => item.value))}>
            {authors.map((author) => <option key={author} value={author} selected={filterAuthors.includes(author)}>{author}</option>)}
          </Form.Select>
        </Col>
        <Col
          sm={12}
          md={3}
          lg={3}
          xl={3}
        >
          <Form.Label style={{ color: '#fff' }}>Select Publish Date</Form.Label>
          <input type="date" name="" id="" style={DateStyle} onChange={(e) => { setDate(e.target.value); }} />
        </Col>
      </Row>
      <Row>
        <Button variant="primary" type="submit" style={formButton} onClick={() => { filterData(); }}>
          Filter
        </Button>
      </Row>
    </Container>
  );
};

export default Filter;
