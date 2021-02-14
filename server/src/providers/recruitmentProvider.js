const utils = require('../utils/utils');
const queryUtils = require('../utils/queryUtils')

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

    const namesListQuery = queryUtils.createInsertNamesListQuery(name, queryUtils.getNowFormated());
    res.namesListId = await queryUtils.executeQuery(namesListQuery);

    const insertSoldiersPersonalDetailsQuery = await queryUtils.createQueryInsertSoldiersPersonalDetails(soldiers);
    res.soldiersPersonalDetails = await queryUtils.executeQuery(insertSoldiersPersonalDetailsQuery);

    const personalNumbers = await utils.getPersonalNumbersFromSoldiers(soldiers);
    const getLastVersionSoldierQuery = await queryUtils.createLastVersionSoldierQuery(personalNumbers);
    const lastVersionDbSoldiers = (await queryUtils.executeQuery(getLastVersionSoldierQuery))[0];
    let soldiersDbMap = await utils.getNamesListSoldiersMap(lastVersionDbSoldiers);
    await setSoldiersVersion(soldiers, soldiersDbMap);    
    console.log("soldiersDbMap: ", soldiersDbMap);
    const insertSoldiersQuery = await queryUtils.createQueryInsertSoldiers(Object.values(soldiersDbMap));
    res.soldiers = await queryUtils.executeQuery(insertSoldiersQuery);

    res.insertSoldiersQuery = insertSoldiersQuery;
    return res;
    // insert personal soldier details if not exists
    // INSERT INTO public.soldier_personal_details(
    //   personal_number, first_name, last_name, creation_date)
    //   VALUES (soldier.personalNumber, soldier.firstName, soldier.lastName, queryUtils.getNowFormated()) ON CONFLICT (personal_number) DO NOTHING;
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

  const _insertSoldiers = async (soldiers, namesListId) => {

    // insert personal soldier details if not exists
    // INSERT INTO public.soldier_personal_details(
    //   personal_number, first_name, last_name, creation_date)
    //   VALUES (soldier.personalNumber, soldier.firstName, soldier.lastName, queryUtils.getNowFormated()) ON CONFLICT (personal_number) DO NOTHING;

    // select data of soldier from last version.
    

    // compare with object data. if same version - take id, otherwise increase version and insert to table

    // INSERT INTO public.soldier( personal_number, version, squad, department, class, role, pakal_id, creation_date)
	  // VALUES (soldier.personalNumber, version+1, soldier.squad, soldier.department, soldier.class, soldier.role, soldier.pakalId, queryUtils.getNowFormated()) RETURNING soldier_id as "soldierId", personal_number as "personalNumber", version;


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