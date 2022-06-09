import slugify from 'slugify';

export const defaultOption = {
  replacement: '-',
  lower: true,
  strict: true,
};

export default (string: string, option = {}) =>
  slugify(string, { ...defaultOption, ...option });
