const utils = require('../utils/utils');
const queryUtils = require('../utils/queryUtils');

const _getSoldiersList = async () => {
    const query = `SELECT personal_number as "personalNumber", first_name as "firstName", last_name as "lastName", creation_date as "creationDate" FROM public.soldier_personal_details ORDER BY personal_number ASC;`;
    const soldiersData = await queryUtils.executeQuery(query);
    //  const soldiersData = await soldier_personal_details.findAll();
      return soldiersData[0];
}

const _getSoldiersNamesList = async namesListId => {
  const query = `SELECT spd.personal_number as "personalNumber", spd.first_name as "firstName", spd.last_name as "lastName", spd.creation_date as "personalDetailsCreationDate", s.id, s.version, s.squad, s.department, s.class, s.role, s.creation_date as "soldierCreationDate"
	FROM public.soldier_personal_details spd 
	inner join soldier s on spd.personal_number = s.personal_number 
	inner join names_list_soldiers nl on s.id = nl.soldier_id where nl.names_list_id = ${namesListId};`;
  const soldiersData = await queryUtils.executeQuery(query);
    return soldiersData[0];
}

const _getNamesList = async namesListId => {
  const namesListMap = {};
  const query = `select nl.id as "namesListId", nl.name, nl.creation_date as "namesListCreationDate",
  spd.personal_number as "personalNumber", spd.first_name as "firstName",  spd.last_name as "lastName", spd.creation_date as "personalDetailsCreationDate",
  s.id as "soldierId", s.version, s.squad, s.department, s.class, s.role, s.pakal_id as "pakalId", s.creation_date as "soldierCreationDate"
  from names_list nl 
     inner join names_list_soldiers nls on nl.id = nls.names_list_id
     inner join soldier s on nls.soldier_id = s.id
     inner join soldier_personal_details spd on s.personal_number = spd.personal_number
     where nl.id = ${namesListId};`;
  const namesListsData = (await queryUtils.executeQuery(query))[0];
  for(let i=0;i<namesListsData.length;i++){
    let namesList = namesListsData[i];
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
    namesListMap[namesListId].soldiers.push(soldier);
  }
  return Object.values(namesListMap);
}

const _getNamesLists = async () => {
  const query = `select id ,name, creation_date as "creationDate", case when task_id is not null then task_id else -1 end as "taskId", 
  (select count(*) from names_list_soldiers where t2.id = names_list_id) as "soldiersCount" from
  (select id, name, creation_date, (select t.id from task t where t.names_list_id = nl.id ) as task_id  from names_list nl) as t2 order by creation_date desc;`;
  return (await queryUtils.executeQuery(query))[0];
}

const _getTasks = async () => {
  const query = `select t.id, t.name as "name", t.status, t.current_task as "currentTask", t.creation_date as "creationDate",t.names_list_id as "namesListId", nl.name as "namesListName" from task t inner join names_list nl on t.names_list_id = nl.id order by t.current_task desc, t.creation_date desc;`;
  return (await queryUtils.executeQuery(query))[0];
}

const _updateTask = async (task) => {
  const {id, currentTask, status} = task;
  let query = `update task set current_task = ${currentTask},status = ${status} where id = ${id};`;
  let res = (await queryUtils.executeQuery(query))[0];
  if(currentTask){
    query = `update task set current_task = false where id != ${id}`;
    await queryUtils.executeQuery(query);
  }
  return res;
}

const _getCurrentTask = async () => {
  const query = `select t.id, t.name as "name", t.status, t.current_task as "currentTask", t.creation_date as "creationDate",t.names_list_id as "namesListId", nl.name as "namesListName" from task t inner join names_list nl on t.names_list_id = nl.id where  t.current_task=true;`;
  return (await queryUtils.executeQuery(query))[0][0];
}

const getSoldiersFromNamesList = async (id)=>{
  const query = `SELECT names_list_id as "namesList", string_agg(soldier_id::character varying, ', ') as "soldiersId"
	FROM public.names_list_soldiers group by names_list_id;`;

}

  const _addNamesList = async (name, soldiers) => {
    const res = {};

    res.namesListId = await insertNamesList(name);
    await insertSoldiersPersonalDetails(soldiers);
    console.log("res.soldiers1: ", soldiers);
    res.soldiers = (await insertSoldiers(soldiers))[0];
    console.log("res.soldiers2: ", res.soldiers);
    res.soldiersNamesList = await insertSoldiersNamesList(res.namesListId, res.soldiers);
    return res;
  }

  const _addTask = async (namesListId, name, currentTask) => {
    const res = {};
    res.taskId = (await insertTask(namesListId, name, currentTask))[0].taskId;
    return res;
  }

  const _savePakals = async (pakals) => {
    console.log("pakals:", pakals);
    const pakalSignatureMap = {};
    const pakalSignatureIdsMap = {};
    const insertedPakalsArr = [];
    const res = {};
    let pakalId = await queryUtils.getMaxPakalId();
    for(let i=0; i< pakals.length; i++){
      let pakal = pakals[i];
      pakalId += 1;
      const {name, signatureList} = pakal;
      const signatureItems = await queryUtils.insertSignatureItems(signatureList);
      for(let i=0; i< signatureItems.length; i++){
        let signatureItemRow = signatureItems[i];
        if(!pakalSignatureMap.hasOwnProperty(name)){
          pakalSignatureIdsMap[name] = [];
          pakalSignatureMap[name] = [];
        }
        pakalSignatureIdsMap[name].push(signatureItemRow.id);
        pakalSignatureMap[name].push(signatureItemRow);
      }
      let insertPakalResult = (await queryUtils.insertPakal(pakalId, name, pakalSignatureIdsMap[name]))[0];
      if(insertPakalResult.length > 0){
        for(let i=0;i<insertPakalResult.length;i++){
          let row = insertPakalResult[i];
          insertedPakalsArr.push({pakalId: row.pakalId, name: row.name, signatureList: pakalSignatureMap[name]});
        }
      }
    }
    return insertedPakalsArr;
  }

  const _saveWarehouseUnit = async (_pakals) => {
    const { taskId, pakals} = _pakals;
    let query = queryUtils.createQueryInsertWarehouseUnit(taskId, pakals);
    return (await queryUtils.executeQuery(query))[0];
  }

  const _getWarehouseUnit = async (taskId) => {
    let query = queryUtils.createQueryGetWarehouseUnit(taskId);
    return (await queryUtils.executeQuery(query))[0];
  }

  const _getAllocatePakalBattlion = async (taskId) => {
    let query = queryUtils.createQueryGetAllocatePakalBattlion(taskId);
    return (await queryUtils.executeQuery(query))[0];
  }

  const _getPakalsFull = async () =>{
    const query = queryUtils.createGetPakalsQuery();
    console.log("query: ", query);
    let res = (await queryUtils.executeQuery(query))[0];
    console.log("res:", res);
    let pakals = {};
    for(let i=0;i<res.length;i++){
      let row = res[i];
      let signatureItem = {id:row.signatureId, item:row.item, serialNumber:row.seriralNumber, quantity:row.quantity}
      if(!pakals.hasOwnProperty(row.pakalId)){
        pakals[row.pakalId] = { pakalId: row.pakalId, name: row.pakalName, signatureList: [] };
      } 
      pakals[row.pakalId].signatureList.push(signatureItem);
    }
    console.log("pakals:", pakals);
    console.log("Object.values(pakals):", Object.values(pakals));

    return Object.values(pakals);
  } 

  const _getPakals = async () =>{
    const query = `SELECT distinct pakal_id as "pakalId", name FROM pakal;`;
    const pakals = await queryUtils.executeQuery(query);
      return pakals[0];
  } 

  const _getMaxPakalId = async () =>{
    const query = `select case when max(pakal_id) is null then 0 else max(pakal_id) end as "maxId" from pakal;`;
    const res = (await queryUtils.executeQuery(query))[0][0];
    console.log("res: ", res);
    return res;
  } 

  const _getMaxSignatureItemId = async () =>{
    const query = `select case when max(id) is null then 0 else max(id) end as "maxId" from signature_item;`;
    const res = (await queryUtils.executeQuery(query))[0][0];
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
    // console.log("lastVersionDbSoldiers: ", lastVersionDbSoldiers);
    let soldiersDbMap = await utils.getNamesListSoldiersMap(lastVersionDbSoldiers);
    soldiersDbMap = setSoldiersVersion(soldiers, soldiersDbMap);    
    // console.log("soldiersDbMap: ", soldiersDbMap);
     console.log("Object.values(soldiersDbMap): ", Object.values(soldiersDbMap).length);
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

  const setSoldiersVersion = (newSoldiers, soldiersDbMap)=>{
    let newSoldiersMap = {};
    for(let i=0;i<newSoldiers.length;i++){
      let newSoldier = newSoldiers[i]; 
      newSoldier.pakalId = -1; // for now
      let dbSoldier = soldiersDbMap[newSoldier.personalNumber];
      newSoldier.version = dbSoldier ? isSameSoldierVersion(newSoldier,dbSoldier) ? dbSoldier.version : dbSoldier.version + 1 : 1;
      newSoldiersMap[newSoldier.personalNumber] = newSoldier;
    }
    // soldiersDbMap = newSoldiersMap; check why soldiersDbMap not changed - by ref
    return newSoldiersMap;
  }

  const insertTask = async (namesListId, name, currentTask)=>{
    const insertTaskQuery = await queryUtils.createQueryInsertTask(namesListId, name, currentTask);
    return (await queryUtils.executeQuery(insertTaskQuery))[0];
  }

  module.exports = {
    getSoldiersList: async () => {
      const result = await _getSoldiersList();
      return result;
    },
    getSoldiersNamesList: async namesListId => {
      const result = await _getSoldiersNamesList(namesListId);
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
    getTasks: async () => {
      try{
        const result = await _getTasks();
        return result;
        } catch(error){
          console.log("error: ", error);
          return {error: true};
        }
    },
    updateTask: async (task) => {
      try{
        const result = await _updateTask(task);
        return result;
        } catch(error){
          console.log("error: ", error);
          return {error: true};
        }
    },
    getCurrentTask: async () => {
      try{
        const result = await _getCurrentTask();
        return result;
        } catch(error){
          console.log("error: ", error);
          return {error: true};
        }
    },
    addNamesList: async (name, soldiers) => {
      try{
      const result = await _addNamesList(name, soldiers);
      return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    },
    addTask: async (namesListId, name, currentTask) => {
      try{
      const result = await _addTask(namesListId, name, currentTask);
      return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    },
    savePakals: async (pakals) => {
      try{
        const result = await _savePakals(pakals);
        return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    },
    saveWarehouseUnit: async (pakals) => {
      try{
        const result = await _saveWarehouseUnit(pakals);
        return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    },
    getWarehouseUnit: async (pakals) => {
      try{
        const result = await _getWarehouseUnit(pakals);
        return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    },
    getAllocatePakalBattlion: async (pakals) => {
      try{
        const result = await _getAllocatePakalBattlion(pakals);
        return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    },
    getPakalsFull: async () => {
      try{
        const result = await _getPakalsFull();
        return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    },
    getPakals: async () => {
      try{
        const result = await _getPakals();
        return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    },
    getMaxPakalId: async () => {
      try{
        const result = await _getMaxPakalId();
        return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    },
    getMaxSignatureItemId: async () => {
      try{
        const result = await _getMaxSignatureItemId();
        return result;
      } catch(error){
        console.log("error: ", error);
        return {error: true};
      }
    }
  };