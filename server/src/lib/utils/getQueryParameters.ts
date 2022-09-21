import isEmpty from 'lodash/isEmpty';

export default (shortColumn: string, parentField: string, query: unknown) => {
  let stringQuery = `WHERE "${shortColumn}"."${parentField}" IS NULL`;
  if (!isEmpty(query)) {
    stringQuery = 'WHERE '.concat(
      Object.keys(query)
        .map((key) => `"D"."${key}"='${query[key]}'`)
        .join('"AND"')
    );
  }
  return stringQuery;
};
