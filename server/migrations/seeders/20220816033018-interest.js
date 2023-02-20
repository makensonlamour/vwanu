/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const { QueryTypes } = require('sequelize');

const query = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'upsertInterest.sql'),
  'utf-8'
);
const interestsList = [
  'Sports',
  'education',
  'Politics',
  'Music',
  'Movies',
  'Finance',
  'Technology',
  'Art',
];

module.exports = {
  async up(queryInterface) {
    await Promise.all(
      interestsList.map((name) =>
        queryInterface.sequelize.query(query, {
          replacements: [v4(), name],
          type: QueryTypes.SELECT,
        })
      )
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Interests', null, {});
  },
};
