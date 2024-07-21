import { sortOptions } from '../filter/models/sort-options';

export const productQueryParams = [
  {
    name: 'page',
    type: 'numeric',
    lowLimit: 1,
    upperLimit: 100,
  },
  {
    name: 'limit',
    type: 'numeric',
    lowLimit: 5,
    upperLimit: 20,
  },
  {
    name: 'sortOption',
    type: 'text',
    validValues: [...sortOptions.map((o) => o.value)],
  },
  {
    name: 'type',
    type: 'array',
  },
  {
    name: 'manufacturer',
    type: 'array',
  },
];
