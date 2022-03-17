import React, { ComponentProps } from 'react';
import { ChakraProvider, theme, VStack, Grid } from '@chakra-ui/react';
import { Filter } from './Filter';
import { Messages } from './Messages';
import { allUsersMessages } from '../utils.js/constans';
import { DateTime } from 'luxon';

export type Filters = {
  query: string;
  isAscOrder: boolean;
  sortingMethod: string;
};

export const App = () => {
  const [filters, setFilters] = React.useState({
    query: '',
    isAscOrder: false,
    sortingMethod: '',
  });

  type FiltersOnChange = ComponentProps<typeof Filter>['onChange'];

  const onChange: FiltersOnChange = (value, filterName) => {
    setFilters((oldFilters) => {
      return { ...oldFilters, [filterName]: value };
    });
  };

  const sortByDate = () => {
    return allUsersMessages.sort((a, b) => {
      const dateСonvertedToMillisecondsA = DateTime.fromISO(a.date).toMillis();
      const dateСonvertedToMillisecondsB = DateTime.fromISO(b.date).toMillis();
      if (filters.isAscOrder) {
        return dateСonvertedToMillisecondsA - dateСonvertedToMillisecondsB;
      }
      return dateСonvertedToMillisecondsB - dateСonvertedToMillisecondsA;
    });
  };

  const sortByRating = () => {
    return allUsersMessages.sort((a, b) => {
      const userRatingA = a.rating;
      const userRatingB = b.rating;
      if (filters.isAscOrder) {
        return userRatingA - userRatingB;
      }
      return userRatingB - userRatingA;
    });
  };

  const sortByAuthorName = () => {
    if (filters.isAscOrder) {
      return allUsersMessages.sort((a, b) => {
        if (a.author > b.author) return 1;
        return -1;
      });
    }

    if (!filters.isAscOrder) {
      return allUsersMessages.sort((a, b) => {
        if (a.author > b.author) return -1;
        return 1;
      });
    }
  };

  const processedMessages = () => {
    if (filters.sortingMethod === 'Sort by date') {
      sortByDate();
    }

    if (filters.sortingMethod === 'Sort by rating') {
      sortByRating();
    }

    if (filters.sortingMethod === 'Sorting by the author of the message') {
      sortByAuthorName();
    }

    return allUsersMessages.filter((message) =>
      message.text.toLowerCase().includes(filters.query.toLowerCase())
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <Grid py='10' px='2'>
        <VStack spacing='10'>
          <Filter onChange={onChange} filters={filters} />
          <Messages messages={processedMessages()} />
        </VStack>
      </Grid>
    </ChakraProvider>
  );
};
