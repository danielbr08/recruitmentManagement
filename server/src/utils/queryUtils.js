const {
  soldier_personal_details
} = require("..//models/");
const {sequelize} = require("..//models/");
var dateFormat = require('dateformat');
const utils = require('../utils/utils');

const executeQuery = async query =>{
  return sequelize.query(query);
}

const getMaxPakalId = async() =>{
  const queryResult = (await executeQuery(`select max(pakal_id) as "maxId" from pakal;`))[0];
  return queryResult.maxId || 0;
}

const insertSignatureItems = async signatureList =>{
  const signatureItems = [];
  for(let i=0;i<signatureList.length;i++){
    let signatureItem = signatureList[i];
    const { item, serialNumber, quantity } = signatureItem;
    let query = `with t as (insert into public.signature_item(item, serial_number, quantity) VALUES ('${item}','${serialNumber}',${quantity}) ON CONFLICT (item, serial_number, quantity) DO NOTHING RETURNING id, item, serial_number, quantity)
    select id, item, serial_number as "serialNumber", quantity from t
    union all
    select si.id, si.item, si.serial_number as "serialNumber", si.quantity from public.signature_item si where si.item = '${item}' and si.serial_number = '${serialNumber}' and si.quantity = ${quantity};`
    let result = (await executeQuery(query))[0];
    console.log("result: ", result);
    signatureItems.push(...result);
  }
  return signatureItems;
}

const insertPakal = async (pakalId, name, signatureIds)=>{
  let result = [];
  for(let i=0;i<signatureIds.length;i++){
    let signatureId = signatureIds[i];
    let query = `with t as (insert into public.pakal(pakal_id, name, signature_id) VALUES (${pakalId}, '${name}', ${signatureId}) ON CONFLICT (name, signature_id) DO NOTHING RETURNING id, pakal_id, name, signature_id)
    select id, pakal_id as "pakalId", name, signature_id as "signatureId" from t
    union all
    select p.id, p.pakal_id as "pakalId", p.name, p.signature_id as "signatureId" from public.pakal p where p.name = '${name}' and p.signature_id = ${signatureId};`;
    result.push((await executeQuery(query))[0]);
  }
  return result;
}

const createQueryInsertSoldiers = async (soldiers)=>{
  let soldiersValues = "";
  let personalNumbers = "";
  await soldiers.forEach(soldier => {
    personalNumbers += `${soldier.personalNumber},`;
    soldiersValues += `('${soldier.personalNumber}','${soldier.version}','${soldier.squad}','${soldier.department}','${soldier.class}','${soldier.role}','${soldier.pakalId}','${getNowFormated()}'),`;
  });
  personalNumbers = removeLastCharacters(personalNumbers, 1);// remove last unnecessary ',' character
  soldiersValues = removeLastCharacters(soldiersValues, 1);
 return `with t as (INSERT INTO public.soldier( personal_number, version, squad, department, class, role, pakal_id, creation_date) VALUES ${soldiersValues} ON CONFLICT (personal_number, version) DO NOTHING RETURNING soldier_id, personal_number, version)
 select soldier_id as "soldierId", personal_number as "personalNumber", version from t
 union all
 select s1.id as "soldierId", s1.personal_number as "personalNumber", s1.version from public.soldier s1 where s1.personal_number in(${personalNumbers}) and s1.version = (select max(s2.version) from public.soldier s2 where s1.personal_number = s2.personal_number);`;
}

const createQueryInsertSoldiersPersonalDetails = async (soldiers)=>{
  let soldiersValues = "";
  await soldiers.forEach(soldier => {
    soldiersValues += `('${soldier.personalNumber}','${soldier.firstName}','${soldier.lastName}','${getNowFormated()}'),`;
  });
  soldiersValues = removeLastCharacters(soldiersValues, 1);
 return `INSERT INTO public.soldier_personal_details( personal_number, first_name, last_name, creation_date) VALUES ${soldiersValues} ON CONFLICT (personal_number) DO NOTHING RETURNING personal_number as "personalNumber";`;
}

const createQueryInsertSoldiersNamesList = async (namesListid, soldiers)=>{
  let soldiersNamesListValues = "";
  await soldiers.forEach(soldier => {
    soldiersNamesListValues += `(${namesListid},${soldier.soldierId}),`;
  });
  soldiersValues = removeLastCharacters(soldiersNamesListValues, 1);
  return `INSERT INTO public.names_list_soldiers( names_list_id, soldier_id) VALUES ${soldiersNamesListValues} RETURNING names_list_id as "namesListId", soldier_id as "soldierId";`;
}

const createLastVersionSoldierQuery = async (personalNumbers)=>{
  return `SELECT s1.id as "soldierId", s1.personal_number as "personalNumber", s1.version, s1.squad, s1.department, s1.class, s1.role, s1.pakal_id as "pakalId", s1.creation_date as "creationDate"
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
  insertSignatureItems,
  insertPakal,
  getMaxPakalId,
  getNowFormated
};