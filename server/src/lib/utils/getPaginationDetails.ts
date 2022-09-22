import isNill from 'lodash/isNil';

export type OffsetAndLimitType = {
  limit?: number;
  offset: number;
};
export type PartialQuery = {
  $skip: number;
  $limit: number;
  max: number;
};

export type Pagination = {
  offsetAndLimit: { limit?: number; offset: number };
  getTotalPages: Function;
};

export default (query: PartialQuery) => {
  const { $skip: page, $limit: size, max } = query;

  const pages = !isNill(page) && page > 0 ? page : 0;

  let sizes = !isNill(size) && size > 0 ? size : max;

  if (sizes > max) sizes = max;
  const offsetAndLimit: OffsetAndLimitType = {
    offset: pages * sizes,
  };
  if (sizes > 0) offsetAndLimit.limit = sizes;
  const getTotalPages = (count: number): number => Math.ceil(count / sizes);

  return { offsetAndLimit, getTotalPages };
};
