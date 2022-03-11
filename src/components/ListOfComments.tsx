import { UnorderedList } from '@chakra-ui/react';
import { Message } from './Message';

export const ListOfComments = () => {
  return (
    <UnorderedList listStyleType='none' minW='50%' maxW='80%'>
      <Message />
    </UnorderedList>
  );
};
