const utils = require('../utils/utils');
const queryUtils = require('../utils/queryUtils')

const _getUsersList = async () => {
    const query = `SELECT personal_number as "personalNumber", first_name as "firstName", last_name as "lastName", creation_date as "creationDate" FROM public.soldier_personal_details ORDER BY personal_number ASC;`;
    const soldiersData = await queryUtils.executeQuery(query);
    //  const soldiersData = await soldier_personal_details.findAll();
      return soldiersData[0];
}

  const _addNamesList = async (namesList) => {
    const res = {};
    const { soldiers, name } = namesList;

    res.namesListId = await insertNamesList(name);
    await insertSoldiersPersonalDetails(soldiers);
    res.soldiers = (await insertSoldiers(soldiers))[0];
    res.soldiersNamesList = await insertSoldiersNamesList(res.namesListId, res.soldiers);
    return res;
  }

  const insertNamesList = async (name)=>{
    const namesListQuery = queryUtils.createInsertNamesListQuery(name, queryUtils.getNowFormated());
    return (await queryUtils.executeQuery(namesListQuery))[0][0].namesListId;
  }

  const insertSoldiersPersonalDetails = async (soldiers)=>{
    const insertSoldiersPersonalDetailsQuery = await queryUtils.createQueryInsertSoldiersPersonalDetails(soldiers);
    return await queryUtils.executeQuery(insertSoldiersPersonalDetailsQuery);
  }

  const insertSoldiers = async (soldiers)=>{
    const personalNumbers = await utils.getPersonalNumbersFromSoldiers(soldiers);
    const getLastVersionSoldierQuery = await queryUtils.createLastVersionSoldierQuery(personalNumbers);
    const lastVersionDbSoldiers = (await queryUtils.executeQuery(getLastVersionSoldierQuery))[0];
    console.log("lastVersionDbSoldiers: ", lastVersionDbSoldiers);
    let soldiersDbMap = await utils.getNamesListSoldiersMap(lastVersionDbSoldiers);
    await setSoldiersVersion(soldiers, soldiersDbMap);    
    const insertSoldiersQuery = await queryUtils.createQueryInsertSoldiers(Object.values(soldiersDbMap));
    return await queryUtils.executeQuery(insertSoldiersQuery);
  }

  const insertSoldiersNamesList = async (namesListid, soldiers)=>{
    const insertSoldiersNamesListQuery = await queryUtils.createQueryInsertSoldiersNamesList(namesListid, soldiers);
    return (await queryUtils.executeQuery(insertSoldiersNamesListQuery))[0];
  }

  const isSameSoldierVersion = (soldier1, soldier2)=>{
    return soldier1.personalNumber === soldier2.personalNumber && soldier1.squad === soldier2.squad 
        && soldier1.department === soldier2.department && soldier1.class === soldier2.class  
        && soldier1.role === soldier2.role && soldier1.pakalId === soldier2.pakalId && soldier1.creationDate === soldier2.creationDate;
  }

  const setSoldiersVersion = async (newSoldiers, soldiersDbMap)=>{
    let newSoldiersMap = {};
    await newSoldiers.forEach(newSoldier => {
      dbSoldier = soldiersDbMap[newSoldier.personalNumber];
      newSoldier.version = dbSoldier ? isSameSoldierVersion(newSoldier,dbSoldier) ? dbSoldier.version : dbSoldier.version + 1 : 1;
      newSoldiersMap[newSoldier.personalNumber] = newSoldier;
    });
    soldiersDbMap = newSoldiersMap;
  }

  module.exports = {
    getUsersList: async () => {
      const result = await _getUsersList();
      return result;
    },
    addNamesList: async (namesList) => {
      try{
      const result = await _addNamesList(namesList);
      return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    }
  };