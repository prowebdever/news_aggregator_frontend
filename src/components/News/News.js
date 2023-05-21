import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid } from '@mui/material';
import NewsItem from '../NewsItem/NewsItem';
import Spinner from '../Spinner/Spinner';
import Search from './Search';
import Filter from './Filter';
import { Header, Container, card } from './style';
import HttpService from '../../services/httpService';
import { header } from '../../config/config';

function News(props) {
  const [articles, setArticles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterString, setFilterString] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  document.title = 'News Aggregator';

  const fetchNews = () => {
    try {
      props.setProgress(25);
      HttpService.get(
        'news?',
        `search=${searchText}&page=1&${filterString}`,
        true
      ).then((response) => {
        setLoading(true);
        props.setProgress(70);
        const parsedData = response.data.data;
        setArticles(parsedData.data);
        setTotalResults(parsedData.total);
        setLoading(false);
        props.setProgress(100);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [searchText, filterString]);

  const fetchMoreNews = () => {
    HttpService.get(
      'news',
      `?search=${searchText}&page=${parseInt(page) + 1}&${filterString}`,
      true
    ).then((response) => {
      setPage(page + 1);
      const parsedData = response.data.data;
      setArticles(articles.concat(parsedData.data));
      setTotalResults(parsedData.total);
    });
  };

  const searchNews = (search) => {
    setSearchText(search);
  };

  const setFilter = (filterString) => {
    setFilterString(filterString);
  };

  return (
    <>
      <Header>
        {header}
      </Header>
      <Container>
        <Grid container justifyContent="center" spacing={2} mb={6}>
          <Grid item xs={12} md={4} lg={4} xl={3}>
            <Search searchNews={searchNews} />
          </Grid>
        </Grid>
        <Filter setFilter={setFilter} />
      </Container>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreNews}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <Container>
          <Grid container spacing={2} mt={6}>
            {articles.map((element) => (
              <Grid item xs={12} md={6} lg={4} xl={3} key={element.id}>
                <NewsItem
                  title={element.title}
                  description={element.body}
                  author={element.author}
                  category={element.category}
                  date={element.created_at}
                  alt="Card image cap"
                  publishedAt={element.published_at}
                  imageUrl={element.thumb}
                  urlNews={element.web_url}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </InfiniteScroll>
    </>
  );
}

News.defaultProps = {
  country: 'us',
  pageSize: 7,
  category: 'general',
};

export default News;
