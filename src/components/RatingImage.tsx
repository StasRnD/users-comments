import { Image } from '@chakra-ui/react';

type Rating = {
  index: number;
  rating: number;
};

export const RatingImage = ({ rating, index }: Rating) => {
  return (
    <Image
      key={index}
      w='15px'
      h='15px'
      src={
        index < rating
          ? 'https://img.icons8.com/material-sharp/344/star--v1.png'
          : 'https://img.icons8.com/material-outlined/344/star--v2.png'
      }
    />
  );
};
