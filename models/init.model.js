const Repairs = require('./repairs.models');
const Users = require('./users.models');

const initModel = () => {
  Users.hasMany(Repairs);
  Repairs.belongsTo(Users);
};

module.exports = { initModel };
