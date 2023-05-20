import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HttpService from '../../services/httpService';

const Filter = (props) => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filterSources, setFilterSources] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterAuthors, setFilterAuthors] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  const filterData = () => {
    const filterString = `source_id=${filterSources.join(',')}&category=${filterCategories.join(',')}&author=${filterAuthors.join(',')}&date=${filterDate}`;
    props.setFilter(filterString);
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
        setFilterDate(preferredDate);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={3} lg={3} xl={3}>
          <FormControl fullWidth>
            <InputLabel id="source-label">Select Source</InputLabel>
            <Select
              labelId="source-label"
              id="source-select"
              multiple
              value={filterSources}
              onChange={(e) => setFilterSources(e.target.value)}
              label="Select Source"
            >
              <MenuItem value={1}>NewsApi</MenuItem>
              <MenuItem value={2}>The guardian</MenuItem>
              <MenuItem value={3}>New York times</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3} lg={3} xl={3}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Select Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              multiple
              value={filterCategories}
              onChange={(e) => setFilterCategories(e.target.value)}
              label="Select Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3} lg={3} xl={3}>
          <FormControl fullWidth>
            <InputLabel id="author-label">Select Author</InputLabel>
            <Select
              labelId="author-label"
              id="author-select"
              multiple
              value={filterAuthors}
              onChange={(e) => setFilterAuthors(e.target.value)}
              label="Select Author"
            >
              {authors.map((author) => (
                <MenuItem key={author} value={author}>
                  {author}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3} lg={3} xl={3}>
          <TextField
            id="date"
            label="Select Publish Date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={5} mt={1}>
        <Grid item>
          <Button variant="contained" onClick={filterData}>
            Filter
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Filter;
