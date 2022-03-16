import { ListItem, Box, Text, UnorderedList } from '@chakra-ui/react';
import { DateTime } from 'luxon';

type allMessages = {
  messages: Message[];
};

type Message = {
  id: number;
  text: string;
  author: string;
  date: string;
};

export const Messages = ({ messages }: allMessages) => {
  const processedMessages = messages.map((message: Message) => {
    return {
      ...message,
      date: DateTime.fromISO(message.date).toFormat('t d MMMM y'),
    };
  });

  return (
    <UnorderedList listStyleType='none' minW='50%' maxW='80%'>
      <ListItem bgColor='lightblue'>
        {processedMessages.map((message) => (
          <Box key={message.id} marginBottom='5'>
            <Text>{message.date}</Text>
            <Text>{message.text}</Text>
            <Text>{message.author}</Text>
          </Box>
        ))}
      </ListItem>
    </UnorderedList>
  );
};
