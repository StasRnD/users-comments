import React, { ComponentProps } from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { Filter } from './Filter';
import { Messages } from './Messages';
import { allUsersMessages } from '../utils.js/constans';
import _ from 'lodash';

export type Filters = {
  query: string;
  isAscOrder: boolean;
  sortingFilt: string;
};

export const App = () => {
  const [filters, setFilters] = React.useState({
    query: '',
    isAscOrder: false,
    sortingFilt: '',
  });

  type FiltersOnChange = ComponentProps<typeof Filter>['onChange'];

  const onChange: FiltersOnChange = (value, filterName) => {
    setFilters((oldFilters) => {
      return { ...oldFilters, [filterName]: value };
    });
  };

  const sortByDate = () => {
    if (filters.isAscOrder) {
      return _.orderBy(allUsersMessages, ['date'], ['asc']);
    }
    return _.orderBy(allUsersMessages, ['date'], ['desc']);
  };

  const sortByRating = () => {
    if (filters.isAscOrder) {
      return _.orderBy(allUsersMessages, ['rating'], ['asc']);
    }
    return _.orderBy(allUsersMessages, ['rating'], ['desc']);
  };

  const sortByAuthorName = () => {
    if (filters.isAscOrder) {
      return _.orderBy(allUsersMessages, ['author'], ['asc']);
    }
    return _.orderBy(allUsersMessages, ['author'], ['desc']);
  };

  let processedMessages = [...allUsersMessages];
  const processMessages = () => {
    if (filters.sortingFilt === 'date') {
      processedMessages = sortByDate();
    }

    if (filters.sortingFilt === 'rating') {
      processedMessages = sortByRating();
    }

    if (filters.sortingFilt === 'author') {
      processedMessages = sortByAuthorName();
    }

    return processedMessages.filter((message) =>
      message.text.toLowerCase().includes(filters.query.toLowerCase())
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <Filter onChange={onChange} filters={filters} />
          <Messages messages={processMessages()} />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
