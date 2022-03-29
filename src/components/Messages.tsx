import { ListItem, Text, UnorderedList, Flex, Image } from '@chakra-ui/react';
import { DateTime } from 'luxon';

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

const maxRating = 10;

const activeRatingIndicator = (num: number) => {
  let scoredRating = [];

  for (let i = 0; i < num; i++) {
    scoredRating[i] = i;
  }

  return scoredRating.map((num) => (
    <Image
      key={num}
      w='15px'
      h='15px'
      src='https://img.icons8.com/material-sharp/344/star--v1.png'
    />
  ));
};

const notActiveRatingIndicator = (num: number) => {
  let scoredNotActiveRating = [];

  for (let i = 0; i < num; i++) {
    scoredNotActiveRating[i] = i;
  }

  return scoredNotActiveRating.map((num) => (
    <Image
      key={num}
      w='15px'
      h='15px'
      src='https://img.icons8.com/material-outlined/344/star--v2.png'
    />
  ));
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
              {activeRatingIndicator(message.rating)}
              {notActiveRatingIndicator(maxRating - message.rating)}
            </Flex>
          </Flex>
        ))}
      </ListItem>
    </UnorderedList>
  );
};
