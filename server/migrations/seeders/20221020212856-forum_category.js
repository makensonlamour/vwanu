// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const categoriesWithInterest = require('../data/cats');

const upsertForumCategoryQuery = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'upsertForumCategory.sql'),
  'utf-8'
);

const upsertInterestQuery = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'upsertInterest.sql'),
  'utf-8'
);
const findOrSaveInterest = async (name, queryInterface) => {
  await queryInterface.sequelize.query(upsertInterestQuery, {
    replacements: [v4(), name],
    type: QueryTypes.SELECT,
  });
};

module.exports = {
  async up(queryInterface) {
    // Cleaning the table
    // await queryInterface.bulkDelete('ForumCategories', null, {});
    await Promise.all(
      categoriesWithInterest.map((category) =>
        queryInterface.sequelize.query(upsertForumCategoryQuery, {
          replacements: [
            v4(),
            category.name,
            category.description,
            category.coverPicture,
          ],
          type: QueryTypes.INSERT,
        })
      )
    );
    await Promise.all(
      categoriesWithInterest.map((category) =>
        findOrSaveInterest(category.name, queryInterface)
      )
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('ForumCategories', null, {});
  },
};
