import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { Messages } from './Messages';
import { Login } from './Login';
import { Registration } from './Registration';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <Routes>
            <Route path='/messages' element={<Messages />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
