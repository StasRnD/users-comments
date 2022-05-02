import { Image } from '@chakra-ui/react';

type RatingImageProps = {
  isActiveRating: Boolean;
};

export const RatingImage = ({ isActiveRating }: RatingImageProps) => {
  return (
    <Image
      w='15px'
      h='15px'
      src={
        isActiveRating
          ? 'https://img.icons8.com/material-sharp/344/star--v1.png'
          : 'https://img.icons8.com/material-outlined/344/star--v2.png'
      }
    />
  );
};
