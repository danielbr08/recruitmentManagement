// const { wrap } = require('../services/error-wrap')
const recruitmentProvider = require('../providers/recruitmentProvider');

const namesList = { soldiers: [
   {personalNumber: '1234', firstName: 'firstName1', lastName: 'lastName1', squad: 'squad1', department: 'department1', class: 'class1', role: 'role1', pakal:{pakalId:-1}},
   {personalNumber: '12345', firstName: 'firstName2', lastName: 'lastName2', squad: 'squad2', department: 'department2', class: 'class2', role: 'role2', pakal:{pakalId:-1}},
   {personalNumber: '123456', firstName: 'firstName3', lastName: 'lastName3', squad: 'squad3', department: 'department3', class: 'class3', role: 'role3', pakal:{pakalId:-1}}
 ],
   name: 'names list 2'};

module.exports = {
   getUsersList: async (req,res,next) => {
      const result = await recruitmentProvider.getUsersList();
      res.status(200).send(result);
   },
   addNamesList: async (req,res,next) => {
      let result = await recruitmentProvider.addNamesList(req.body.namesList);
      if(!result.error)
         res.status(200).send(result);
      else
         res.status(500).send("error occurd");

   },
}