import { ListItem, Text, UnorderedList, Flex, Image } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import times from 'lodash/times';

type allMessages = {
  messages: Message[];
};

type Message = {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
};

const indicatorRating = (indicator: number) =>
  times(5).map((index) => {
    indicator--;
    return (
      <Image
        key={index}
        w='15px'
        h='15px'
        src={
          indicator >= 0
            ? 'https://img.icons8.com/material-sharp/344/star--v1.png'
            : 'https://img.icons8.com/material-outlined/344/star--v2.png'
        }
      />
    );
  });

export const Messages = ({ messages }: allMessages) => {
  const processedMessages = messages.map((message: Message) => {
    return {
      ...message,
      date: DateTime.fromISO(message.date).toFormat('dd.MM.y'),
    };
  });

  return (
    <UnorderedList listStyleType='none' minW='50%' maxW='70%'>
      <ListItem>
        {processedMessages.map((message) => (
          <Flex
            key={message.id}
            flexDirection='column'
            marginBottom='10'
            rowGap='5px'
          >
            <Flex justifyContent='space-between'>
              <Text>Date: {message.date}</Text>
              <Text>by {message.author}</Text>
            </Flex>
            <Text>{message.text}</Text>
            <Flex alignItems='center' columnGap='5px'>
              <Text>Rating:</Text>
              <Flex>{indicatorRating(message.rating)}</Flex>
            </Flex>
          </Flex>
        ))}
      </ListItem>
    </UnorderedList>
  );
};
