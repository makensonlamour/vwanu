// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const countriesData = require('./country-state-cities.min');

const findOrSaveStateQuery = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'findOrSaveState.sql'),
  'utf-8'
);

const findOrSaveCityQuery = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'findOrSaveCity.sql'),
  'utf-8'
);

const upsertCountryQuery = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'upsertCountry.sql'),
  'utf-8'
);
const findOrSaveState = async (stateAndCities, countryId, queryInterface) => {
  const { name, initials, cities } = stateAndCities;
  const val = await queryInterface.sequelize.query(findOrSaveStateQuery, {
    replacements: [v4(), name, countryId, initials],
    type: QueryTypes.SELECT,
  });

  return val[0]?.id ? { StateId: val[0].id, cities } : null;
};

const findOrSaveCity = async (city, stateId, queryInterface) => {
  const { name } = city;
  return queryInterface.sequelize.query(findOrSaveCityQuery, {
    type: QueryTypes.SELECT,
    replacements: [v4(), name, stateId],
  });
};

async function saveAndAssociateCities(queryInterface, stateAndCities) {
  if (!stateAndCities) return;
  const { StateId, cities } = stateAndCities;

  // console.log({ stateAndCities });
  if (!cities || !cities.length) return;

  const list = cities.map(({ name }) => ({
    id: v4(),
    name,
    StateId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await Promise.all(
    list.map((city) => findOrSaveCity(city, city.StateId, queryInterface))
  );

  // await queryInterface.bulkInsert('Cities', list, {
  //   updateOnDuplicate: ['name'],
  // });
}
async function saveAndAssociateStatesAndCities(queryInterface, stateDetails) {
  const { states: stateList, CountryId } = stateDetails;
  if (!stateList || !stateList.length) return;
  // save the states or see if the existed

  const savedStatesAndCities = await Promise.all(
    stateList
      .map(async (stateAndCities) =>
        findOrSaveState(stateAndCities, CountryId, queryInterface)
      )
      .filter((state) => state !== null)
  );

  // console.log({ savedStatesAndCities });
  // For each state save all the cities.
  if (!savedStatesAndCities || !savedStatesAndCities.length) return;
  await Promise.all(
    savedStatesAndCities.map(async (stateAnCities) =>
      saveAndAssociateCities(queryInterface, stateAnCities)
    )
  );
}

const countriesList = countriesData.map((country) => ({
  id: v4(),
  ...country,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
const countries = countriesList.map((country) => ({
  id: country.id,
  name: country.name,
  initials: country.initials,
  createdAt: country.createdAt,
  updatedAt: country.updatedAt,
}));
const countriesWithStates = countriesList.filter((country) =>
  Object.prototype.hasOwnProperty.call(country, 'states')
);

module.exports = {
  async up(queryInterface) {
    // await queryInterface.bulkDelete('States', null, {});
    // await queryInterface.bulkDelete('Cities', null, {});
    // await queryInterface.bulkDelete('Countries', null, {});
    await Promise.all(
      countries.map((country) =>
        queryInterface.sequelize.query(upsertCountryQuery, {
          replacements: [country.id, country.name, country.initials],
          type: QueryTypes.SELECT,
        })
      )
    );
    // await queryInterface.bulkInsert('Countries', countries);
    // save and associate state with countries then save and associate cities with states
    await Promise.all(
      countriesWithStates.map(async ({ states, id: CountryId }) =>
        saveAndAssociateStatesAndCities(queryInterface, { states, CountryId })
      )
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Countries', null, {});
  },
};
