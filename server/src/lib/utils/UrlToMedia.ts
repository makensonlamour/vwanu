import config from 'config';

const tinySize = config.get('tinySize');
const smallSize = config.get('smallSize');
const mediumSize = config.get('mediumSize');

type Media = {
  original: string;
  medium: string;
  small: string;
  tiny: string;
};
export default (imageUrl: string): Media => ({
  tiny: imageUrl.replace(/\upload\//g, `upload/${tinySize}/`),
  medium: imageUrl.replace(/\upload\//g, `upload/${mediumSize}/`),
  small: imageUrl.replace(/\upload\//g, `upload/${smallSize}/`),
  original: imageUrl,
});
