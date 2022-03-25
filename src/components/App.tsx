import React, { ComponentProps } from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
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

const url = new URL(document.location.href);

const defaultFilters = {
  query: url.searchParams.get('query') || '',
  isAscOrder: url.searchParams.get('isAscOrder') === 'true' ? true : false,
  sortingField: '' as Filters['sortingField'],
  date: {
    from: url.searchParams.get('date.from') || '',
    to: url.searchParams.get('date.to') || '',
  },
};

export const App = () => {
  const [filters, setFilters] = React.useState(defaultFilters);

  type FiltersOnChange = ComponentProps<typeof Filter>['onChange'];

  const onChange: FiltersOnChange = (value, filterName) => {
    setFilters((oldFilters) =>
      set(deepСopyOfTheFilteringObject(oldFilters), filterName, value)
    );

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
  const deepСopyOfTheFilteringObject = (filters: Filters) => cloneDeep(filters);

  const resetFilter = () =>
    setFilters(deepСopyOfTheFilteringObject(defaultFilters));

  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <Filter
            onChange={onChange}
            filters={filters}
            onResetFilters={resetFilter}
          />
          <Messages messages={messages} />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
