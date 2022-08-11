import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress
} from '@mui/material';
import React, { Fragment } from 'react';

const SelectableMedia = (props) => {
  const {
    loading,
    title,
    minWidth,
    width,
    maxWidth,
    imageUrl,
    imageAlt,
    selected,
    onSelect,
    sx
  } = props;

  const selectedStyles = {
    border: 3,
    borderColor: 'primary.main',
  };

  const cardStyles = {
    minWidth,
    width,
    maxWidth,
    mr: 1,
    mb: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    ...selected ? selectedStyles : {},
    ...sx
  };

  const cardContent =
    <Fragment>
      {title && <CardContent sx={{ p: 1, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
        {title}
      </CardContent>}
      {loading && <CardContent sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <CircularProgress />
      </CardContent>}
      {!loading &&
        <CardMedia
          component="img"
          height="auto"
          image={imageUrl}
          crossOrigin="anonymous"
          alt={imageAlt}
          sx={{
            imageRendering: "-webkit-optimize-contrast",
          }}
        />
      }
    </Fragment>

  return (
    <Card sx={cardStyles} elevation={6}>
      {typeof onSelect === 'function'
        ? <CardActionArea onClick={onSelect} component="a">{cardContent}</CardActionArea>
        : cardContent}
    </Card>
  );
};

SelectableMedia.defaultProps = {
  loading: false,
  title: undefined,
  minWidth: 250,
  maxWidth: 250,
  variation: {},
  imageUrl: undefined,
  imageAlt: undefined,
  selected: false,
  onSelect: undefined,
};

export default SelectableMedia;
