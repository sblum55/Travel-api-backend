'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_country.init({
    userId: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_country',
  });
  return user_country;
};