// eslint-disable-next-line import/no-extraneous-dependencies
const { v4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const countriesData = require('../data/country-state-cities.min');

const findOrSaveState = async (stateAndCities, countryId, queryInterface) => {
  const { name, initials, cities } = stateAndCities;
  const query = `
  INSERT INTO "States" (id, name, "CountryId", "initials", "createdAt", "updatedAt" )
  VALUES ('${v4()}', '${name}', '${countryId}','${initials}', current_timestamp, current_timestamp)
  ON CONFLICT DO NOTHING RETURNING id;`;

  const val = await queryInterface.sequelize.query(
    query,

    { type: QueryTypes.SELECT }
  );

  return val[0]?.id ? { StateId: val[0].id, cities } : null;
};

const findOrSaveCity = async (city, stateId, queryInterface) => {
  // console.log(`Saving cities of state with id: ${stateId}}`);

  const { name } = city;
  const query = `
  INSERT INTO "Cities" (id, name, "StateId", "createdAt", "updatedAt" )
  VALUES ('${v4()}', '${name}', '${stateId}', current_timestamp, current_timestamp)
  ON CONFLICT DO NOTHING RETURNING id;`;

  return queryInterface.sequelize.query(query, { type: QueryTypes.SELECT });
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

  console.log({ savedStatesAndCities });
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
    await queryInterface.bulkDelete('States', null, {});
    await queryInterface.bulkDelete('Cities', null, {});
    await queryInterface.bulkDelete('Countries', null, {});
    await queryInterface.bulkInsert('Countries', countries);
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
