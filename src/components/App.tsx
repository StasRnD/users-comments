import * as React from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { SearchAndSortContainer } from './SearchAndSortContainer';
import { ListOfComments } from './ListOfComments';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Grid py='10' px='2'>
      <VStack spacing='10'>
        <SearchAndSortContainer />
        <ListOfComments />
      </VStack>
    </Grid>
  </ChakraProvider>
);
