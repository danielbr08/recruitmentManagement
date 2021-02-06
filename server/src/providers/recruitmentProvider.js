const {
    soldier_personal_details
} = require("..//models/");

const _getUsersList = async () => {
    const soldiersData = await soldier_personal_details.findAll();
    return soldiersData;
  };

  const _insertSoldier = async (soldier, namesListId) => {
    // insert personal soldier details if not exists

    // insert soldier if version not changed, otherwise take oid of last version
    
    // insert to nameslist_soldier(id of soldier, namesListId)
    const soldiersData = await soldier_personal_details.findAll();
    return soldiersData;
  };


  module.exports = {
    getUsersList: async () => {
      const result = await _getUsersList();
      return result;
    },
    insertSoldier: async () => {
      const result = await _insertSoldier();
      return result;
    }
  };