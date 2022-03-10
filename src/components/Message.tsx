import { ListItem, Text, Flex } from '@chakra-ui/react';

export const Message = () => {
  return (
    <Flex direction='column' gap='10'>
      <ListItem bgColor='lightblue'>
        <Text>Date1</Text>
        <Text>
          МНого много много текста МНого много много текста МНого много много
          текста МНого много много текста МНого много много текста МНого много
          много текста МНого много много текста МНого много много текста МНого
          много много текста МНого много много текста МНого много много текста
        </Text>
        <Text>Author1</Text>
      </ListItem>
      <ListItem bgColor='lightblue'>
        <Text>Date2</Text>
        <Text>Comment2</Text>
        <Text>Author2</Text>
      </ListItem>
    </Flex>
  );
};
