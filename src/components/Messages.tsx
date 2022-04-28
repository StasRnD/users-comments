import { useState } from 'react';
import { allUsersMessages } from '../utils.js/constans';
import {
  ListItem,
  Text,
  UnorderedList,
  Flex,
  Input,
  Checkbox,
  Select,
  Box,
  Button,
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { sortingOptions } from '../utils.js/constans';
import { RatingImage } from './RatingImage';
import { DateTime } from 'luxon';
import times from 'lodash/times';
import orderBy from 'lodash/orderBy';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

type Filters = {
  query: string;
  isAscOrder: boolean;
  sortingField: 'date' | 'rating' | 'author';
  date: {
    from: string;
    to: string;
  };
};

type FiltersProps = {
  filters: Filters;
  onChange: (value: any, filterName: string) => void;
};

type Message = {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
};

const defaultFilters = {
  query: '',
  isAscOrder: false,
  sortingField: '' as Filters['sortingField'],
  date: {
    from: '',
    to: '',
  },
};

export const Messages = () => {
  const [filters, setFilters] = useState(() => {
    const url = new URL(document.location.href);
    return {
      query: url.searchParams.get('query') || '',
      isAscOrder: url.searchParams.get('isAscOrder') === 'true' ? true : false,
      sortingField: '' as Filters['sortingField'],
      date: {
        from: url.searchParams.get('date.from') || '',
        to: url.searchParams.get('date.to') || '',
      },
    };
  });

  const onChange: FiltersProps['onChange'] = (value, filterName) => {
    const url = new URL(document.location.href);
    setFilters((oldFilters) => set(cloneDeep(oldFilters), filterName, value));
    url.searchParams.set(filterName, value);
    window.history.pushState(null, '', url.search);
  };

  const comparingTheMessageDateWithTheFilteringDates = (date: string) => {
    const dateTime = DateTime.fromISO(date);

    return (
      dateTime >= DateTime.fromISO(filters.date.from) &&
      dateTime <= DateTime.fromISO(filters.date.to)
    );
  };

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

  const resetFilter = () => {
    const url = new URL(document.location.href);
    window.history.pushState(null, '', `${url.pathname}`);
    setFilters(cloneDeep(defaultFilters));
  };

  const messages = orderBy(
    allUsersMessages,
    filters.sortingField,
    filters.isAscOrder ? ['asc'] : ['desc']
  )
    .filter((message) =>
      message.text.toLowerCase().includes(filters.query.toLowerCase())
    )
    .filter((message) =>
      filters.date.from && filters.date.to
        ? comparingTheMessageDateWithTheFilteringDates(message.date)
        : message
    );

  const processedMessages = messages.map((message: Message) => {
    return {
      ...message,
      date: DateTime.fromISO(message.date).toFormat('dd.MM.y'),
    };
  });

  return (
    <>
      <Flex columnGap='10px' alignItems='flex-end' m='0 auto'>
        <label>
          Query
          <Input
            borderRadius='0'
            border='solid 2px grey'
            value={filters.query}
            onChange={onChangeSearchInput}
          />
        </label>

        <label>
          Start date
          <Box
            borderRadius='0'
            border='solid 2px rgba(128,128,128,0.2)'
            h='40px'
          >
            <DatePicker
              dateFormat='dd.MM.yyyy'
              selected={valueDateForDatePicker(filters.date.from)}
              onChange={onChangeStartDateForFilter}
            />
          </Box>
        </label>

        <label>
          End date
          <Box
            borderRadius='0'
            border='solid 2px rgba(128,128,128,0.2)'
            h='40px'
          >
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
          onClick={resetFilter}
          bgColor='rgba(128,128,128,0.2)'
          borderRadius='0'
          whiteSpace='normal'
          fontSize='sm'
        >
          Reset
        </Button>
      </Flex>

      <UnorderedList listStyleType='none' minW='50%' maxW='70%'>
        <ListItem>
          {processedMessages.map((message) => (
            <Flex
              key={message.id}
              flexDirection='column'
              marginBottom='10'
              rowGap='5px'
            >
              <Flex justifyContent='space-between'>
                <Text>Date: {message.date}</Text>
                <Text>by {message.author}</Text>
              </Flex>
              <Text>{message.text}</Text>
              <Flex alignItems='center' columnGap='5px'>
                <Text>Rating:</Text>
                <Flex>
                  {times(5, (index) => (
                    <RatingImage
                      indicator={index < message.rating ? true : false}
                      index={index}
                    />
                  ))}
                </Flex>
              </Flex>
            </Flex>
          ))}
        </ListItem>
      </UnorderedList>
    </>
  );
};
