var sequelize = require("../config/dbConfig")

const models = {
  Text: sequelize.import('./text'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = models;


