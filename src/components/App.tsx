import React from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { SearchAndSortContainer } from './SearchAndSortContainer';
import { Messages } from './Message';
import { allUsersComments } from '../utils.js/constans';
import { DateTime } from 'luxon';

export type Filters = {
  query: string;
  isAscOrder: boolean;
};

export const App = () => {
  const [filters, setFilters] = React.useState({
    query: '',
    isAscOrder: true,
  });

  function onChange(value: string | Boolean, filterName: keyof Filters) {
    setFilters((oldFilters) => {
      return { ...oldFilters, [filterName]: value };
    });
  }

  //сортировка массива комментариев по дате
  function sortingComments() {
    return allUsersComments.sort((a, b) => {
      let dateСonvertedToMilliseconds1 = DateTime.fromISO(a.date).toMillis();
      let dateСonvertedToMilliseconds2 = DateTime.fromISO(b.date).toMillis();

      if (filters.isAscOrder) {
        return dateСonvertedToMilliseconds1 - dateСonvertedToMilliseconds2;
      }
      return dateСonvertedToMilliseconds2 - dateСonvertedToMilliseconds1;
    });
  }

  //фильтрация по значению input отсортированного массива, возвращается отфильтрованный массив комментариев
  function filterComments() {
    return sortingComments().filter((comment) =>
      comment.text.toLowerCase().includes(filters.query.toLowerCase())
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <SearchAndSortContainer onChange={onChange} filters={filters} />
          <Messages comments={filterComments()} />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
