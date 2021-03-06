'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.country.belongsToMany(models.user, {through: 'user_country'})
      models.country.hasMany(models.vaccine)
    }
  };
  country.init({
    name: DataTypes.STRING,
    language: DataTypes.STRING,
    currency: DataTypes.STRING,
    travelAdvisory: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'country',
  });
  return country;
};