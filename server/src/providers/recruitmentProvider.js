var dateFormat = require('dateformat');
const {
  soldier_personal_details
} = require("..//models/");
const {sequelize} = require("..//models/");
const soldier = require('../models/soldier');

const getNowFormated = ()=>{
  return dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
}

const _getUsersList = async () => {
  // const query = "SELECT * FROM public.soldier_personal_details ORDER BY personal_number ASC;";
  // const soldiersData = await sequelize.query(query);
  // //  const soldiersData = await soldier_personal_details.findAll();
  //   return soldiersData[0];

  const namesList = { soldiers: [
    {personalNumber: '1234', firstName: 'firstName1', lastName: 'lastName1', squad: 'squad1', department: 'department1', class: 'class1', role: 'role1', pakalId:-1},
    {personalNumber: '12345', firstName: 'firstName2', lastName: 'lastName2', squad: 'squad2', department: 'department2', class: 'class2', role: 'role2', pakalId:-1},
    {personalNumber: '123456', firstName: 'firstName3', lastName: 'lastName3', squad: 'squad3', department: 'department3', class: 'class3', role: 'role3', pakalId:-1}
  ],
    name: 'names list 1'};
  return _insertNamesList(namesList);
  };

  const _insertNamesList = async (namesList) => {
    const res = {};
    const { soldiers, name } = namesList;

    // const namesListQuery = createInsertNamesListQuery(name, getNowFormated());
    // res.namesListId = await executeQuery(namesListQuery);

    // const insertSoldiersPersonalDetailsQuery = await createQueryInsertSoldiersPersonalDetails(soldiers);
    // res.soldiersPersonalDetails = await executeQuery(insertSoldiersPersonalDetailsQuery);

    const personalNumbers = await getPersonalNumbersFromSoldiers(soldiers);
    const getLastVersionSoldierQuery = await createLastVersionSoldierQuery(personalNumbers);
    const lastVersionDbSoldiers = (await executeQuery(getLastVersionSoldierQuery))[0];
    let soldiersDbMap = await getNamesListSoldiersMap(lastVersionDbSoldiers);
    await setSoldiersVersion(soldiers, soldiersDbMap);    
    console.log("soldiersDbMap: ", soldiersDbMap);
    const insertSoldiersQuery = await createQueryInsertSoldiers(Object.values(soldiersDbMap));
    // res.soldiers = await executeQuery(insertSoldiersQuery);

    return res.insertSoldiersQuery = insertSoldiersQuery;
    // insert personal soldier details if not exists
    // INSERT INTO public.soldier_personal_details(
    //   personal_number, first_name, last_name, creation_date)
    //   VALUES (soldier.personalNumber, soldier.firstName, soldier.lastName, getNowFormated()) ON CONFLICT (personal_number) DO NOTHING;
    // const personalNumberSoldierMap = {};
    // const personalNumbers = [];
    // await soldiers.forEach(element => {
    //   let personalNumber = element.personalNumber;
    //   personalNumberSoldierMap[personalNumber] = element;
    //   personalNumbers.push(personalNumber);
    // }); 


    // _insertSoldiers();


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

  const getNamesListSoldiersMap = async (soldiers)=>{
    const namesListSoldiersMap = {};
    await soldiers.forEach(soldier => {
      namesListSoldiersMap[soldier.personalNumber] = soldier;
    });
    return namesListSoldiersMap;
  }

  const getPersonalNumbersFromSoldiers = async (soldiers)=>{
    personalNumbers = "";
    await soldiers.forEach(element => {
      let personalNumber = element.personalNumber;
      personalNumbers += `'${personalNumber}',`;
    });
    return personalNumbers.substr(0,personalNumbers.length-1);
  }

  const createLastVersionSoldierQuery = async (personalNumbers)=>{
    return `SELECT s1.soldier_id as "soldierId", s1.personal_number as "personalNumber", s1.version, s1.squad, s1.department, s1.class, s1.role, s1.pakal_id as "pakalId", s1.creation_date as "creationDate"
    FROM public.soldier s1
    WHERE s1.personal_number in(${personalNumbers}) 
    and version = (select max(version) from public.soldier s2 where s1.personal_number = s2.personal_number);`;
  }

  const createInsertNamesListQuery = (name, creationDate)=>{
    return `INSERT INTO public.names_list( name, creation_date) VALUES ( '${name}', '${creationDate}') ON CONFLICT (name) DO NOTHING RETURNING names_list_id as "namesListId";`;
  }

  const createQueryInsertSoldiersPersonalDetails = async (soldiers)=>{
    let soldiersValues = "";
    await soldiers.forEach(soldier => {
      soldiersValues += `('${soldier.personalNumber}','${soldier.firstName}','${soldier.lastName}','${getNowFormated()}'),`;
    });
    soldiersValues = soldiersValues.substr(0,soldiersValues.length-1);// remove last unnecessary ',' character
   return `INSERT INTO public.soldier_personal_details( personal_number, first_name, last_name, creation_date) VALUES ${soldiersValues} ON CONFLICT (personal_number) DO NOTHING RETURNING personal_number as "personalNumber";`;
  }

  const createQueryInsertSoldiers = async (soldiers)=>{
    let soldiersValues = "";
    let personalNumbers = "";
    await soldiers.forEach(soldier => {
      personalNumbers += `${soldier.personalNumber},`;
      soldiersValues += `('${soldier.personalNumber}','${soldier.version}','${soldier.squad}','${soldier.department}','${soldier.class}','${soldier.role}','${soldier.pakalId}','${getNowFormated()}'),`;
    });
    personalNumbers = personalNumbers.substr(0,personalNumbers.length-1);
    soldiersValues = soldiersValues.substr(0,soldiersValues.length-1);// remove last unnecessary ',' character
   return `with t as (INSERT INTO public.soldier( personal_number, version, squad, department, class, role, pakal_id, creation_date) VALUES ${soldiersValues} ON CONFLICT (personal_number, version) DO NOTHING RETURNING soldier_id, personal_number, version)
   select soldier_id as "soldierId", personal_number as "personalNumber", version from t
   union all
   select s1.soldier_id as "soldierId", s1.personal_number as "personalNumber", s1.version from public.soldier s1 where s1.personal_number in(${personalNumbers}) and s1.version = (select max(s2.version) from public.soldier s2 where s1.personal_number = s2.personal_number);`;
  }

  const _insertSoldiers = async (soldiers, namesListId) => {

    // insert personal soldier details if not exists
    // INSERT INTO public.soldier_personal_details(
    //   personal_number, first_name, last_name, creation_date)
    //   VALUES (soldier.personalNumber, soldier.firstName, soldier.lastName, getNowFormated()) ON CONFLICT (personal_number) DO NOTHING;

    // select data of soldier from last version.
    

    // compare with object data. if same version - take id, otherwise increase version and insert to table

    // INSERT INTO public.soldier( personal_number, version, squad, department, class, role, pakal_id, creation_date)
	  // VALUES (soldier.personalNumber, version+1, soldier.squad, soldier.department, soldier.class, soldier.role, soldier.pakalId, getNowFormated()) RETURNING soldier_id as "soldierId", personal_number as "personalNumber", version;


    // with i as (

    // INSERT INTO t(personal_number) VALUES ('personal_number') ON CONFLICT (personal_number) DO NOTHING RETURNING id
    // )
    // select id from i
    // union all
    // select id from t where personal_number = 'personal_number' order by version desc
    // limit 1
    
    // insert to nameslist_soldier(id of soldier, namesListId)
    const soldiersData = await soldier_personal_details.findAll();
    return soldiersData;
  };

  const executeQuery = async (query)=>{
    return sequelize.query(query);
  }


  module.exports = {
    getUsersList: async () => {
      const result = await _getUsersList();
      return result;
    },
    insertSoldiers: async () => {
      const result = await _insertSoldiers();
      return result;
    }
  };