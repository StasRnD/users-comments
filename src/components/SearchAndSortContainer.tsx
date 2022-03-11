import React from 'react';
import { Flex, Input, Text, Checkbox, HStack } from '@chakra-ui/react';

export const SearchAndSortContainer = ({
  check,
  setCheck,
  valueSearchInput,
  setValueSearchInput,
}: {
  check: boolean;
  setCheck: Function;
  valueSearchInput: string;
  setValueSearchInput: Function;
}) => {
  const handleCheckBoxClick = () => {
    setCheck(!check);
  };

  const onChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    setValueSearchInput(evt.target.value);
  };

  return (
    <Flex flexWrap='wrap'>
      <Input
        placeholder='Search for comments'
        borderRadius='0'
        border='solid 2px grey'
        value={valueSearchInput}
        onChange={onChangeSearchInput}
      ></Input>

      <Flex
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        w='100%'
      >
        <HStack spacing='2'>
          <Checkbox
            border='red'
            isChecked={check}
            onChange={handleCheckBoxClick}
          ></Checkbox>
          <Text>Sorting by date of comments</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};
