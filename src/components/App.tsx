import React from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { SearchAndSortContainer } from './SearchAndSortContainer';
import { ListOfComments } from './ListOfComments';
import { allUsersComments } from '../utils.js/constans';

export const App = () => {
  const [check, setCheck] = React.useState(true);
  const [valueSearchInput, setValueSearchInput] = React.useState('');

  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <SearchAndSortContainer
            check={check}
            setCheck={setCheck}
            valueSearchInput={valueSearchInput}
            setValueSearchInput={setValueSearchInput}
          />
          <ListOfComments />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
