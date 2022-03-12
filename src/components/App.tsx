import React from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { SearchAndSortContainer } from './SearchAndSortContainer';
import { ListOfComments } from './ListOfComments';
import { allUsersComments } from '../utils.js/constans';
import { Filters } from '../types/Filters';

export const App = () => {
  const [filters, setFilters] = React.useState({ query: '', isAscOrder: true });

  React.useEffect(() => {
    console.log(filters);
  });

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
          <ListOfComments />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
