import React from 'react';
import { author, publishedAt, category } from '../../config/config';
import { detail, sum, text } from './style';

export default function Details(props) {
  return (
    <details style={detail}>
      <summary style={sum}>Category, Author and Date</summary>
      <p style={text}>
        {category(props.category)}
      </p>
      <p style={text}>
        {author(props.author)}
      </p>
      <p style={text}>
        {publishedAt(props.date)}
      </p>
    </details>
  );
}
