// eslint-disable-next-line import/no-extraneous-dependencies
const { v4 } = require('uuid');
let stateList = require('../data/states');

module.exports = {
  async up(queryInterface) {
    const countries = await queryInterface.sequelize.query(
      'SELECT id , name from "Countries";'
    );

    stateList = stateList.slice(0, stateList.length / 100);

    await queryInterface.bulkInsert(
      'State',
      stateList
        .map((state) => {
          const CountryId = countries[0].find(
            (country) => country.name === state.country_name
          ).id;

          if (CountryId) {
            return {
              name: state.name,
              id: v4(),
              createdAt: new Date(),
              updatedAt: new Date(),
              initials: state.state_code,
              CountryId,
            };
          }
          return null;
        })
        .filter((state) => !!state)
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('State', null, {});
  },
};
