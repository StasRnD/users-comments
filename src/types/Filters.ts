type Filters = {
    query: string;
    isAscOrder: boolean;
};

type FiltersProps = {
    filters: Filters;
    onChange: <T extends keyof Filters>(value: Filters[T], filterName: T) => void;
};


export type {Filters, FiltersProps}