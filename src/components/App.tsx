import React, { ComponentProps } from 'react';
import { ChakraProvider, theme, VStack, Grid, Button } from '@chakra-ui/react';
import { Filter } from './Filter';
import { Messages } from './Messages';
import { allUsersMessages } from '../utils.js/constans';
import { DateTime } from 'luxon';
import orderBy from 'lodash/orderBy';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

export type Filters = {
  query: string;
  isAscOrder: boolean;
  sortingField: 'date' | 'rating' | 'author';
  date: {
    from: string;
    to: string;
  };
};

export const App = () => {
  const [filters, setFilters] = React.useState({
    query: '',
    isAscOrder: false,
    sortingField: '' as Filters['sortingField'],
    date: {
      from: '',
      to: '',
    },
  });

  const [defaultFilters] = React.useState(cloneDeep(filters));

  type FiltersOnChange = ComponentProps<typeof Filter>['onChange'];

  const onChange: FiltersOnChange = (value, filterName) => {
    setFilters((oldFilters) => set(cloneDeep(oldFilters), filterName, value));
  };

  const comparingTheMessageDateWithTheFilteringDates = (date: string) => {
    const dateTime = DateTime.fromISO(date);

    return (
      dateTime >= DateTime.fromISO(filters.date.from) &&
      dateTime <= DateTime.fromISO(filters.date.to)
    );
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
      filters.date.from.length && filters.date.to.length
        ? comparingTheMessageDateWithTheFilteringDates(message.date)
        : message
    );

  const resetFilter = () => setFilters(cloneDeep(defaultFilters));

  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <Filter onChange={onChange} filters={filters} />
          <Button type='button' onClick={resetFilter}>
            Reset all filters
          </Button>
          <Messages messages={messages} />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
