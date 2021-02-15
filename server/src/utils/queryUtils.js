const {
    soldier_personal_details
  } = require("..//models/");
const {sequelize} = require("..//models/");
var dateFormat = require('dateformat');


const executeQuery = async (query)=>{
    return sequelize.query(query);
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

  const createQueryInsertSoldiersPersonalDetails = async (soldiers)=>{
    let soldiersValues = "";
    await soldiers.forEach(soldier => {
      soldiersValues += `('${soldier.personalNumber}','${soldier.firstName}','${soldier.lastName}','${getNowFormated()}'),`;
    });
    soldiersValues = soldiersValues.substr(0,soldiersValues.length-1);// remove last unnecessary ',' character
   return `INSERT INTO public.soldier_personal_details( personal_number, first_name, last_name, creation_date) VALUES ${soldiersValues} ON CONFLICT (personal_number) DO NOTHING RETURNING personal_number as "personalNumber";`;
  }

  const createQueryInsertSoldiersNamesList = async (namesListid, soldiers)=>{
    let soldiersNamesListValues = "";
    await soldiers.forEach(soldier => {
      soldiersNamesListValues += `(${namesListid},${soldier.soldierId}),`;
    });
    soldiersNamesListValues = soldiersNamesListValues.substr(0,soldiersNamesListValues.length-1);// remove last unnecessary ',' character
    return `INSERT INTO public.names_list_soldiers( names_list_id, soldier_id) VALUES ${soldiersNamesListValues} RETURNING names_list_id as "namesListId", soldier_id as "soldierId";`;
  }

  const createLastVersionSoldierQuery = async (personalNumbers)=>{
    return `SELECT s1.soldier_id as "soldierId", s1.personal_number as "personalNumber", s1.version, s1.squad, s1.department, s1.class, s1.role, s1.pakal_id as "pakalId", s1.creation_date as "creationDate"
    FROM public.soldier s1
    WHERE s1.personal_number in(${personalNumbers}) 
    and version = (select max(version) from public.soldier s2 where s1.personal_number = s2.personal_number);`;
  }

  const createInsertNamesListQuery = (name, creationDate)=>{
    return `INSERT INTO public.names_list( name, creation_date) VALUES ( '${name}', '${creationDate}') RETURNING names_list_id as "namesListId";`;
  }

  const getNowFormated = ()=>{
    return dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss");
  }

  module.exports = {
    executeQuery,
    createQueryInsertSoldiers,
    createQueryInsertSoldiersPersonalDetails,
    createLastVersionSoldierQuery,
    createInsertNamesListQuery,
    createQueryInsertSoldiersNamesList,
    getNowFormated
  };