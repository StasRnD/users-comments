import React from 'react';
import { ListItem, Text, Flex } from '@chakra-ui/react';
import { ContentMessage } from '../types/ContentMessage';
import { DateTime } from 'luxon';

export const Message = ({ id, text, author, date }: ContentMessage) => {
  return (
    <Flex direction='column' gap='10'>
      <ListItem bgColor='lightblue'>
        <Text>{DateTime.fromISO(date).toFormat('t d MMMM y')}</Text>
        <Text>{text}</Text>
        <Text>{author}</Text>
      </ListItem>
    </Flex>
  );
};
