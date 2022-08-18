const Sequelize = require('sequelize');
const app = require('../../src/app');

const models = app.get('models');
const sequelize = app.get('sequelize');

// The export object must be a dictionary of model names -> models
// It must also include sequelize (instance) and Sequelize (constructor) properties
module.exports = {
  Sequelize,
    sequelize,
  ...models
};
