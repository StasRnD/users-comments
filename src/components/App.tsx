import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

export const App = () => <ChakraProvider theme={theme}></ChakraProvider>;
