import React from 'react';
import { Flex, Input, Text, Checkbox, HStack } from '@chakra-ui/react';
import { FiltersProps } from '../types/Filters';

export const SearchAndSortContainer = ({ filters, onChange }: FiltersProps) => {
  const handleCheckBoxClick: React.ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    onChange(evt.target.checked, 'isAscOrder');
  };

  const onChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    onChange(evt.target.value, 'query');
  };

  return (
    <Flex flexWrap='wrap'>
      <Input
        placeholder='Search for comments'
        borderRadius='0'
        border='solid 2px grey'
        value={filters.query}
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
            isChecked={filters.isAscOrder}
            onChange={handleCheckBoxClick}
          ></Checkbox>
          <Text>Sorting by date of comments</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};
