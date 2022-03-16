import React, { ComponentProps } from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { Filter } from './Filter';
import { Messages } from './Messages';
import { allUsersMessages } from '../utils.js/constans';
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

  type FiltersOnChange = ComponentProps<typeof Filter>['onChange'];

  const onChange: FiltersOnChange = (value, filterName) => {
    setFilters((oldFilters) => {
      return { ...oldFilters, [filterName]: value };
    });
  };

  const processedMessages = allUsersMessages
    .sort((a, b) => {
      const dateСonvertedToMillisecondsA = DateTime.fromISO(a.date).toMillis();
      const dateСonvertedToMillisecondsB = DateTime.fromISO(b.date).toMillis();

      if (filters.isAscOrder) {
        return dateСonvertedToMillisecondsA - dateСonvertedToMillisecondsB;
      }
      return dateСonvertedToMillisecondsB - dateСonvertedToMillisecondsA;
    })
    .filter((message) =>
      message.text.toLowerCase().includes(filters.query.toLowerCase())
    );

  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <Filter onChange={onChange} filters={filters} />
          <Messages messages={processedMessages} />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
