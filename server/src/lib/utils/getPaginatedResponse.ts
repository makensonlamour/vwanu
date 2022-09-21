export type ReturnValue = {
  total: number; // '<total number of records>';
  limit: number; // '<max number of items per page>';
  skip: number; // '<number of skipped items (offset)>';
  data: any[]; // '<array of items on current page>';
};

export type AcceptableValues = {
  max: number; // Maximum number permited in pagination;
  $limit: number; // '<max number of items per page>';
  $skip: number; // '<number of skipped items (offset)>';
  data: any[]; // '<array of items on current page>';
};
export default (values: AcceptableValues): ReturnValue => {
  const { $limit, $skip, max, data } = values;
  const total = data.length;
  return {
    total,
    limit: $limit,
    skip: $skip >= max ? $skip : max,
    data,
  };
};
