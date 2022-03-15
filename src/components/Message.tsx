import { ListItem, Box, Text, UnorderedList } from '@chakra-ui/react';
import { DateTime } from 'luxon';

type allMessages = {
  comments: Message[];
};

type Message = {
  id: number;
  text: string;
  author: string;
  date: string;
};

export const Messages = ({ comments }: allMessages) => {
  //отобразить комментарии пользователей
  function createListComments() {
    return comments.map((comment: Message) => {
      let formattedDate = DateTime.fromISO(comment.date).toFormat('t d MMMM y');
      return (
        <Box key={comment.id} marginBottom='5'>
          <Text>{formattedDate}</Text>
          <Text>{comment.text}</Text>
          <Text>{comment.author}</Text>
        </Box>
      );
    });
  }

  return (
    <UnorderedList listStyleType='none' minW='50%' maxW='80%'>
      <ListItem bgColor='lightblue'>{createListComments()}</ListItem>
    </UnorderedList>
  );
};
