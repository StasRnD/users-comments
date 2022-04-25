import { ListItem, Text, UnorderedList, Flex } from '@chakra-ui/react';
import { RatingImage } from './RatingImage';
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
              <Flex>
                {times(5, (index) => (
                  <RatingImage rating={message.rating} index={index} />
                ))}
              </Flex>
            </Flex>
          </Flex>
        ))}
      </ListItem>
    </UnorderedList>
  );
};
