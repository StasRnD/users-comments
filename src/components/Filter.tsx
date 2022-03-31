import React from 'react';
import { Flex, Input, Checkbox, Select, Box, Button } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Filters } from './App';
import { sortingOptions } from '../utils.js/constans';
import { DateTime } from 'luxon';

type FiltersProps = {
  filters: Filters;
  onChange: (value: any, filterName: string) => void;
  onResetFilters: () => void;
};

export const Filter = ({ filters, onChange, onResetFilters }: FiltersProps) => {
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

  const onChangeStartDateForFilter = (date: Date | null) => {
    onChange(
      date !== null ? DateTime.fromJSDate(date).toISO() : null,
      'date.from'
    );
  };

  const onChangeEndDateForFilter = (date: Date | null) => {
    onChange(
      date !== null ? DateTime.fromJSDate(date).toISO() : null,
      'date.to'
    );
  };

  const valueDateForDatePicker = (date: string) =>
    date ? new Date(date) : null;

  return (
    <Flex columnGap='10px' alignItems='flex-end' w='85%'>
      <label>
        Search for comments
        <Input
          borderRadius='0'
          border='solid 2px grey'
          value={filters.query}
          onChange={onChangeSearchInput}
        />
      </label>

      <label>
        Start date
        <Box borderRadius='0' border='solid 2px rgba(128,128,128,0.2)' h='40px'>
          <DatePicker
            dateFormat='dd.MM.yyyy'
            selected={valueDateForDatePicker(filters.date.from)}
            onChange={onChangeStartDateForFilter}
          />
        </Box>
      </label>

      <label>
        End date
        <Box borderRadius='0' border='solid 2px rgba(128,128,128,0.2)' h='40px'>
          <DatePicker
            dateFormat='dd.MM.yyyy'
            selected={valueDateForDatePicker(filters.date.to)}
            onChange={onChangeEndDateForFilter}
          />
        </Box>
      </label>

      <Select
        onChange={onChangeSortingMethod}
        border='2px solid grey'
        borderRadius='0'
        maxW='300px'
      >
        <option hidden>Sort selection</option>
        {sortingOptions.map((option) => (
          <option key={option.key} value={option.filt}>
            {option.label}
          </option>
        ))}
      </Select>

      <Box
        border='2px solid rgba(128,128,128,0.2)'
        position='relative'
        w='80px'
        _hover={{
          bg: 'rgba(128,128,128,0.2)',
        }}
        onChange={handleCheckBoxClick}
      >
        <ArrowUpIcon position='absolute' top='0' left='0' w='100%' h='100%' />

        <Checkbox
          isChecked={filters.isAscOrder}
          opacity='0'
          w='100%'
          h='36px'
        />
      </Box>

      <Button
        type='button'
        onClick={onResetFilters}
        bgColor='rgba(128,128,128,0.2)'
        borderRadius='0'
        whiteSpace='normal'
        fontSize='sm'
      >
        Reset all filters
      </Button>
    </Flex>
  );
};
