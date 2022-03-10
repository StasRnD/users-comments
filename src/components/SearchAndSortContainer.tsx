import { Button, Flex, Input, Text, Checkbox, HStack } from '@chakra-ui/react';

export const SearchAndSortContainer = () => {
  return (
    <Flex flexWrap='wrap'>
      <Input
        placeholder='Search for comments'
        w='70%'
        borderRadius='0'
        border='solid 2px grey'
      ></Input>
      <Button minW='30%' borderRadius='0'>
        Search
      </Button>
      <Flex
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        w='100%'
      >
        <HStack spacing='2'>
          <Checkbox border='red'></Checkbox>
          <Text>Sorting by date of comments</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};
