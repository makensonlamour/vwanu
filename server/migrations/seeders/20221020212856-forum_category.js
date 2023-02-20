// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const categoriesWithoutInterest = require('../data/categories_and_interest');

const upsertForumCategoryQuery = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'upsertForumCategory.sql'),
  'utf-8'
);
const findOrSaveInterest = async (name, queryInterface) => {
  const val = await queryInterface.sequelize.query(
    `
  INSERT INTO "Interests" (id, name, "createdAt", "updatedAt")
  VALUES ('${v4()}', '${name}', current_timestamp, current_timestamp)
  ON CONFLICT (name) DO UPDATE SET name = '${name}' RETURNING id;`,

    { type: QueryTypes.SELECT }
  );

  return { InterestId: val[0].id };
};

async function saveAndAssociateCategoryInterest(queryInterface, category) {
  const { interest: interestList } = category;
  if (!interestList || !interestList.length) return;

  await Promise.all(
    interestList.map(async (name) => findOrSaveInterest(name, queryInterface))
  );

  // if (!interests || !interests.length) return;
  // const list = interests.map(({ InterestId }) => ({
  //   InterestId,
  //   ForumCategoryId: category.id,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // }));

  // await queryInterface.bulkInsert('CategoryInterests', list);
}

const cats = categoriesWithoutInterest.map((category) => ({
  ...category,
  id: v4(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const categoriesToSave = cats.map((category) => ({
  id: category.id,
  name: category.name,
  description: category.description,
  createdAt: category.createdAt,
  updatedAt: category.updatedAt,
  coverPicture: category.coverPicture,
}));
module.exports = {
  async up(queryInterface) {
    // Cleaning the table
    // await queryInterface.bulkDelete('ForumCategories', null, {});
    // create the category
    await Promise.all(
      categoriesToSave.map((category) =>
        queryInterface.sequelize.query(upsertForumCategoryQuery, {
          replacements: [
            category.id,
            category.name,
            category.description,
            category.coverPicture,
          ],
          type: QueryTypes.SELECT,
        })
      )
    );
    // await queryInterface.bulkInsert('ForumCategories', categoriesToSave);
    // create or associate categories with interests
    await Promise.all(
      cats
        .filter((category) =>
          Object.prototype.hasOwnProperty.call(category, 'interest')
        )
        .map((category) =>
          saveAndAssociateCategoryInterest(queryInterface, category)
        )
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ForumCategories', null, {});
  },
};
