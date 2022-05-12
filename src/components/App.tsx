import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { Articles } from './Articles';
import { Login } from './Login';
import { Registration } from './Registration';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <Routes>
            <Route path='/articles' element={<Articles />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
