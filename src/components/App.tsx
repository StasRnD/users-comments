import React, { ComponentProps } from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { Filter } from './Filter';
import { Messages } from './Messages';
import { Login } from './Login';
import { allUsersMessages } from '../utils.js/constans';
import { Route, Routes } from 'react-router-dom';
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
  query: '',
  isAscOrder: false,
  sortingField: '' as Filters['sortingField'],
  date: {
    from: '',
    to: '',
  },
};

export const App = () => {
  const filterCreatedDependingOnTheUrl = {
    query: url.searchParams.get('query') || '',
    isAscOrder: url.searchParams.get('isAscOrder') === 'true' ? true : false,
    sortingField: '' as Filters['sortingField'],
    date: {
      from: url.searchParams.get('date.from') || '',
      to: url.searchParams.get('date.to') || '',
    },
  };

  const [filters, setFilters] = React.useState(filterCreatedDependingOnTheUrl);

  type FiltersOnChange = ComponentProps<typeof Filter>['onChange'];

  const onChange: FiltersOnChange = (value, filterName) => {
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

  const resetFilter = () => {
    window.history.pushState(null, '', '/messages');
    url.search = '';
    setFilters(cloneDeep(defaultFilters));
  };

  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <Routes>
            <Route
              path='/messages'
              element={
                <>
                  <Filter
                    onChange={onChange}
                    filters={filters}
                    onResetFilters={resetFilter}
                  />
                  <Messages messages={messages} />
                </>
              }
            />

            <Route path='/' element={<Login />} />
          </Routes>
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
