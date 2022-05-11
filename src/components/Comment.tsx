import { ListItem, Text } from '@chakra-ui/react';

type CommentProps = {
  name: string;
  text: string;
};

export const Comment = ({ name, text }: CommentProps) => {
  return (
    <ListItem marginBottom='20px'>
      <Text
        fontStyle='italic'
        fontSize='12px'
        textDecoration='underline'
      >{`Комментарий от пользователя ${name}`}</Text>
      <Text fontStyle='italic' fontSize='12px'>
        {text}
      </Text>
    </ListItem>
  );
};
