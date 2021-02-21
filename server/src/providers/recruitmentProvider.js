const utils = require('../utils/utils');
const queryUtils = require('../utils/queryUtils')

const _getUsersList = async () => {
    const query = `SELECT personal_number as "personalNumber", first_name as "firstName", last_name as "lastName", creation_date as "creationDate" FROM public.soldier_personal_details ORDER BY personal_number ASC;`;
    const soldiersData = await queryUtils.executeQuery(query);
    //  const soldiersData = await soldier_personal_details.findAll();
      return soldiersData[0];
}

const _getNamesLists = async () => {
  const namesListMap = {};
  const query = `select nl.names_list_id as "namesListId", nl.name, nl.creation_date as "namesListCreationDate",
  spd.personal_number as "personalNumber", spd.first_name as "firstName",  spd.last_name as "lastName", spd.creation_date as "personalDetailsCreationDate",
  s.soldier_id as "soldierId", s.version, s.squad, s.department, s.class, s.role, s.pakal_id as "pakalId", s.creation_date as "soldierCreationDate"
  from names_list nl 
     inner join names_list_soldiers nls on nl.names_list_id = nls.names_list_id
     inner join soldier s on nls.soldier_id = s.soldier_id
     inner join soldier_personal_details spd on s.personal_number = spd.personal_number;`;
  const namesListsData = (await queryUtils.executeQuery(query))[0];
  await namesListsData.forEach(namesList => {
    let namesListId = namesList.namesListId;
    if(!namesListMap.hasOwnProperty(namesListId)){
      namesListMap[namesListId] = {namesListId};
      namesListMap[namesListId].name = namesList.name;
      namesListMap[namesListId].crationDate = namesList.crationDate;
      namesListMap[namesListId].soldiers = [];
    }
    let personalNumber = namesList.personalNumber;
    let firstName = namesList.firstName;
    let lastName = namesList.lastName;
    let personalDetailsCreationDate = namesList.personalDetailsCreationDate;
    let soldierId = namesList.soldierId;
    let version = namesList.version;
    let squad = namesList.squad;
    let department = namesList.department;
    let _class = namesList.class;
    let role = namesList.role;
    let pakalId = namesList.pakalId;
    let soldierCreationDate = namesList.soldierCreationDate;
    let soldier = {personalNumber, firstName, lastName, personalDetailsCreationDate, soldierId, version, squad, department, class: _class, role, pakalId, soldierCreationDate}; 
    namesListMap.namesListId.soldiers.push(soldier);
  });
    return Object.values(namesListMap);
}

const getSoldiersFromNamesList = async (id)=>{
  const query = `SELECT names_list_id as "namesList", string_agg(soldier_id::character varying, ', ') as "soldiersId"
	FROM public.names_list_soldiers group by names_list_id;`;

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

  const _warehouseUnit = async (warehouseUnit) => {
    {"id":1,"pakal":"מאג","signatureList":
    [{"id":1,"item":"רצועה","serialNumber":"123456","quantity":4},
    {"id":2,"item":"חצובה","serialNumber":"12345","quantity":4},
    {"id":3,"item":"מאג","serialNumber":"1234","quantity":2}]
  },
    const res = {};
    const { signatureList, name } = warehouseUnit;

    let values = "";
    await signatureList.forEach(signatureItem => {
      const { item, serialNumber, quantity } = warehouseUnit.signatureList;
      values += `(${item}, ${serialNumber}, ${quantity}),`;
    });
    values = values.substr(0,values.length-1);
    let query = `insert into public warehouse_unit(item, serial_number, quantity) VALUES ${values} RETURNING item, serial_number as "serialNumber", quantity`;
    
    // insert
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
    getNamesLists: async () => {
      try{
        const result = await _getNamesLists();
        return result;
        } catch(error){
          console.log("error: ", error);
          return {error: true};
        }
    },
    addNamesList: async (namesList) => {
      try{
      const result = await _addNamesList(namesList);
      return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    },
    warehouseUnit: async (warehouseUnit) => {
      try{
      const result = await _warehouseUnit(warehouseUnit);
      return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    }
  };