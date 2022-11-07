module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('addressTypes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (
              ![
                'Work',
                'Home',
                'Billing',
                'Shipping',
                'School',
                'Other',
              ].includes(value)
            ) {
              throw new Error(`${value} is not a valid option for description`);
            }
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('addressTypes');
  },
};
