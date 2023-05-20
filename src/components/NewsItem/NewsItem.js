import {
  Card, CardContent, CardMedia, Typography, Button
} from '@mui/material';
import Details from './Details';
import {
  card, img, btn, txt
} from './style';

function NewsItem(props) {
  const {
    imageUrl, alt, description, title, author, category, date, urlNews
  } = props;

  return (
    <Card sx={card}>
      <CardMedia component="img" sx={img} image={imageUrl} alt={alt} />
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography sx={txt} variant="body2" component="p">
          {description}
        </Typography>
        <Details author={author} category={category} date={date} />
        <Button href={urlNews} target="_blank" sx={btn} variant="contained">
          Show more...
        </Button>
      </CardContent>
    </Card>
  );
}

export default NewsItem;
