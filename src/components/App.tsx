import React, { ComponentProps } from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { Filter } from './Filter';
import { Messages } from './Messages';
import { allUsersMessages } from '../utils.js/constans';
import { DateTime } from 'luxon';
import orderBy from 'lodash.orderby';

export type Filters = {
  query: string;
  isAscOrder: boolean;
  sortingField: 'date' | 'rating' | 'author';
  filterStartDate: string;
  filterEndDate: string;
};

export const App = () => {
  const [filters, setFilters] = React.useState({
    query: '',
    isAscOrder: false,
    sortingField: '' as Filters['sortingField'],
    filterStartDate: '',
    filterEndDate: '',
  });

  type FiltersOnChange = ComponentProps<typeof Filter>['onChange'];

  const onChange: FiltersOnChange = (value, filterName) => {
    setFilters((oldFilters) => {
      return { ...oldFilters, [filterName]: value };
    });
  };

  const comparingTheMessageDateWithTheFilteringDates = (date: string) => {
    const messageDateInMilliseconds = DateTime.fromISO(date).toMillis();
    return (
      messageDateInMilliseconds >
        DateTime.fromISO(
          filters.filterStartDate.split('.').reverse().join('-')
        ).toMillis() &&
      messageDateInMilliseconds <
        DateTime.fromISO(
          filters.filterEndDate.split('.').reverse().join('-')
        ).toMillis()
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
      filters.filterStartDate.length > 9 && filters.filterEndDate.length > 9
        ? comparingTheMessageDateWithTheFilteringDates(message.date)
        : message
    );

  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <Filter onChange={onChange} filters={filters} />
          <Messages messages={messages} />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
