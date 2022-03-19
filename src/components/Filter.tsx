import React from 'react';
import {
  Flex,
  Input,
  Text,
  Checkbox,
  HStack,
  Select,
  Box,
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { Filters } from './App';
import { sortingOptions } from '../utils.js/constans';
type FiltersProps = {
  filters: Filters;
  onChange: <T extends keyof Filters>(value: Filters[T], filterName: T) => void;
};

export const Filter = ({ filters, onChange }: FiltersProps) => {
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

  const onChangeSortingMethod: React.ChangeEventHandler<HTMLSelectElement> = (
    evt
  ) => {
    onChange(evt.target.value as 'date' | 'rating' | 'author', 'sortingField');
  };

  return (
    <Flex flexWrap='wrap' rowGap='5'>
      <Input
        placeholder='Search for comments'
        borderRadius='0'
        border='solid 2px grey'
        value={filters.query}
        onChange={onChangeSearchInput}
      ></Input>
      <Select onChange={onChangeSortingMethod}>
        <option hidden>Sorting selection</option>
        {sortingOptions.map((option) => (
          <option key={option.key} value={option.filt}>
            {option.label}
          </option>
        ))}
      </Select>
      <Flex
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        w='100%'
      >
        <HStack spacing='2'>
          <Box
            borderRadius='2px'
            border='1px solid lightblue'
            position='relative'
            w='30%'
            _active={{
              bg: 'lightblue',
            }}
            onChange={handleCheckBoxClick}
          >
            <ArrowUpIcon
              position='absolute'
              top='0'
              left='0'
              w='100%'
              h='100%'
            ></ArrowUpIcon>

            <Checkbox
              isChecked={filters.isAscOrder}
              opacity='0'
              w='100%'
              h='25px'
            ></Checkbox>
          </Box>

          <Text>Display comments in reverse order</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};
