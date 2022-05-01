import React, { ComponentProps } from 'react';
import { Filter } from './Filter';
import { UserMessages } from './UserMessages';
import { allUsersMessages } from '../utils.js/constans';
import { DateTime } from 'luxon';
import orderBy from 'lodash/orderBy';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

export type Filters = {
  query: string;
  isAscOrder: boolean;
  sortingField: 'date' | 'rating' | 'author';
  date: {
    from: string;
    to: string;
  };
};

const defaultFilters = {
  query: '',
  isAscOrder: false,
  sortingField: '' as Filters['sortingField'],
  date: {
    from: '',
    to: '',
  },
};

export const Messages = () => {
  const [filters, setFilters] = React.useState(() => {
    const url = new URL(document.location.href);
    return {
      query: url.searchParams.get('query') || '',
      isAscOrder: url.searchParams.get('isAscOrder') === 'true' ? true : false,
      sortingField: '' as Filters['sortingField'],
      date: {
        from: url.searchParams.get('date.from') || '',
        to: url.searchParams.get('date.to') || '',
      },
    };
  });

  type FiltersOnChange = ComponentProps<typeof Filter>['onChange'];
  const onChange: FiltersOnChange = (value, filterName) => {
    const url = new URL(document.location.href);
    setFilters((oldFilters) => set(cloneDeep(oldFilters), filterName, value));
    url.searchParams.set(filterName, value);
    window.history.pushState(null, '', url.search);
  };

  const comparingTheMessageDateWithTheFilteringDates = (date: string) => {
    const dateTime = DateTime.fromISO(date);

    return (
      dateTime >= DateTime.fromISO(filters.date.from) &&
      dateTime <= DateTime.fromISO(filters.date.to)
    );
  };

  const messages = orderBy(
    allUsersMessages,
    filters.sortingField,
    filters.isAscOrder ? ['asc'] : ['desc']
  )
    .filter((message) =>
      message.text.toLowerCase().includes(filters.query.toLowerCase())
    )
    .filter((message) =>
      filters.date.from && filters.date.to
        ? comparingTheMessageDateWithTheFilteringDates(message.date)
        : message
    );

  const resetFilter = () => {
    const url = new URL(document.location.href);
    window.history.pushState(null, '', `${url.pathname}`);

    setFilters(cloneDeep(defaultFilters));
  };

  return (
    <>
      <Filter
        onChange={onChange}
        filters={filters}
        onResetFilters={resetFilter}
      />
      <UserMessages messages={messages} />
    </>
  );
};
