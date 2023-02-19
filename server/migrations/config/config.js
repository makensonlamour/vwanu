const config = require('config');

const env = process.env?.NODE_ENV?.trim() || 'development';

const dbSettings = config.get('dbSettings');

module.exports = {
  [env]: {
    ...dbSettings,
  },
};
