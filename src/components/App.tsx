import React, { ComponentProps } from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { Filter } from './Filter';
import { Messages } from './Messages';
import { allUsersMessages } from '../utils.js/constans';
import orderBy from 'lodash.orderby';

export type Filters = {
  query: string;
  isAscOrder: boolean;
  sortingField: 'date' | 'rating' | 'author';
};

export const App = () => {
  const [filters, setFilters] = React.useState({
    query: '',
    isAscOrder: false,
    sortingField: '' as Filters['sortingField'],
  });

  type FiltersOnChange = ComponentProps<typeof Filter>['onChange'];

  const onChange: FiltersOnChange = (value, filterName) => {
    setFilters((oldFilters) => {
      return { ...oldFilters, [filterName]: value };
    });
  };

  const messages = orderBy(
    allUsersMessages,
    filters.sortingField,
    filters.isAscOrder ? ['asc'] : ['desc']
  ).filter((message) =>
    message.text.toLowerCase().includes(filters.query.toLowerCase())
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
