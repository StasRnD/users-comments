import { Flex, Input, Text, Checkbox, HStack } from '@chakra-ui/react';

export const SearchAndSortContainer = () => {
  return (
    <Flex flexWrap='wrap'>
      <Input
        placeholder='Search for comments'
        borderRadius='0'
        border='solid 2px grey'
        w='100%'
      ></Input>

      <Flex justifyContent='center' alignItems='center' flexWrap='wrap'>
        <HStack spacing='2'>
          <Checkbox border='red'></Checkbox>
          <Text>Sorting by date of comments</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};
