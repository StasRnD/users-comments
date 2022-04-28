import { Image } from '@chakra-ui/react';

type RatingImageProps = {
  index: number;
  indicator: Boolean;
};

export const RatingImage = ({ indicator, index }: RatingImageProps) => {
  return (
    <Image
      key={index}
      w='15px'
      h='15px'
      src={
        indicator
          ? 'https://img.icons8.com/material-sharp/344/star--v1.png'
          : 'https://img.icons8.com/material-outlined/344/star--v2.png'
      }
    />
  );
};
