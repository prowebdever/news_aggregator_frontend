import React from 'react';
import { Button, Card } from 'react-bootstrap';
import Details from './Details';
import {
  card, img, btn, txt
} from './style';

function NewsItem(props) {
  const {
    imageUrl, alt, description, title, author, category, date, urlNews
  } = props;
  return (
    <Card style={card}>
      <Card.Img style={img} variant="top" src={imageUrl} alt={alt} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={txt}>
          {description}
        </Card.Text>
        <Details author={author} category={category} date={date} />
        <Button href={urlNews} target="_blank" style={btn}>Show more...</Button>
      </Card.Body>
    </Card>
  );
}

export default NewsItem;
