const {
    soldier_personal_details
} = require("..//models/");

const _getUsersList = async () => {
    const soldiersData = await soldier_personal_details.findAll();
    return soldiersData;
  };


  module.exports = {
    getUsersList: async () => {
      const result = await _getUsersList();
      return result;
    }
  };