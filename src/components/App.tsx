import React from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { SearchAndSortContainer } from './SearchAndSortContainer';
import { ListOfComments } from './ListOfComments';
import { allUsersComments } from '../utils.js/constans';
import { Filters } from '../types/Filters';
import { DateTime } from 'luxon';

export const App = () => {
  const [filters, setFilters] = React.useState({ query: '', isAscOrder: true });

  function onChange(value: any, filterName: keyof Filters) {
    setFilters((oldFilters) => {
      return { ...oldFilters, [filterName]: value };
    });
  }

  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <SearchAndSortContainer onChange={onChange} filters={filters} />
          {allUsersComments
            .sort((a, b) => {
              if (filters.isAscOrder) {
                return (
                  DateTime.fromISO(a.date).toMillis() -
                  DateTime.fromISO(b.date).toMillis()
                );
              }
              return (
                DateTime.fromISO(b.date).toMillis() -
                DateTime.fromISO(a.date).toMillis()
              );
            })

            // eslint-disable-next-line array-callback-return
            .map((comment) => {
              if (
                comment.text.toLowerCase().includes(filters.query.toLowerCase())
              ) {
                return (
                  <ListOfComments
                    id={comment.id}
                    text={comment.text}
                    author={comment.author}
                    date={comment.date}
                  />
                );
              }
            })}
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
