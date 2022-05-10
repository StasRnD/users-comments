import React, { ComponentProps } from 'react';
import { Filter } from './Filter';
import { UserArticles } from './UserArticles';
import { allUsersArticles } from '../utils.js/constans';
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

export const Articles = () => {
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

  const comparingTheArticleDateWithTheFilteringDates = (date: string) => {
    const dateTime = DateTime.fromISO(date);

    return (
      dateTime >= DateTime.fromISO(filters.date.from) &&
      dateTime <= DateTime.fromISO(filters.date.to)
    );
  };

  const articles = orderBy(
    allUsersArticles,
    filters.sortingField,
    filters.isAscOrder ? ['asc'] : ['desc']
  )
    .filter((articles) =>
      articles.text.toLowerCase().includes(filters.query.toLowerCase())
    )
    .filter((articles) =>
      filters.date.from && filters.date.to
        ? comparingTheArticleDateWithTheFilteringDates(articles.date)
        : articles
    );

  const resetFilter = () => {
    window.history.pushState(null, '', window.location.pathname);
    setFilters(cloneDeep(defaultFilters));
  };

  return (
    <>
      <Filter
        onChange={onChange}
        filters={filters}
        onResetFilters={resetFilter}
      />
      <UserArticles articles={articles} />
    </>
  );
};
