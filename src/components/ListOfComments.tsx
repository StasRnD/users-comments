import React from 'react';
import { UnorderedList } from '@chakra-ui/react';
import { Message } from './Message';
import { ContentMessage } from '../types/ContentMessage';

// eslint-disable-next-line no-empty-pattern
export const ListOfComments = ({ id, text, author, date }: ContentMessage) => {
  return (
    <UnorderedList listStyleType='none' minW='50%' maxW='80%'>
      <Message id={id} text={text} date={date} author={author} />
    </UnorderedList>
  );
};
