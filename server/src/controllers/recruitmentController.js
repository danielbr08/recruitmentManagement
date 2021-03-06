// const { wrap } = require('../services/error-wrap')
const recruitmentProvider = require('../providers/recruitmentProvider');

const namesList = { soldiers: [
   {personalNumber: '1234', firstName: 'firstName1', lastName: 'lastName1', squad: 'squad1', department: 'department1', class: 'class1', role: 'role1', pakal:{pakalId:-1}},
   {personalNumber: '12345', firstName: 'firstName2', lastName: 'lastName2', squad: 'squad2', department: 'department2', class: 'class2', role: 'role2', pakal:{pakalId:-1}},
   {personalNumber: '123456', firstName: 'firstName3', lastName: 'lastName3', squad: 'squad3', department: 'department3', class: 'class3', role: 'role3', pakal:{pakalId:-1}}
 ],
   name: 'names list 2'};

module.exports = {
   getSoldiersList: async (req,res,next) => {
      const result = await recruitmentProvider.getSoldiersList();
      res.status(200).send(result);
   },
   getSoldiersNamesList: async (req,res,next) => {
      const namesListId = req.query.namesListId;
      const result = await recruitmentProvider.getSoldiersNamesList(namesListId);
      res.status(200).send(result);
   },
   getNamesLists: async (req,res,next) => {
      const result = await recruitmentProvider.getNamesLists();
      res.status(200).send(result);
   },
   getTasks: async (req,res,next) => {
      const result = await recruitmentProvider.getTasks();
      res.status(200).send(result);
   },
   updateTask: async (req,res,next) => {
      const result = await recruitmentProvider.updateTask(req.body);
      res.status(200).send(result);
   },
   getCurrentTask: async (req,res,next) => {
      const result = await recruitmentProvider.getCurrentTask();
      res.status(200).send(result);
   },
   addNamesList: async (req,res,next) => {
      let result = await recruitmentProvider.addNamesList(req.body.name, req.body.soldiers);
      if(!result.error)
         res.status(200).send(result);
      else
         res.status(500).send("error occurd");
   },
   addTask: async (req,res,next) => {
      let result = await recruitmentProvider.addTask(req.body.namesListId, req.body.name, req.body.currentTask);
      if(!result.error)
         res.status(200).send(result);
      else
         res.status(500).send("error occurd");
   },
   savePakals: async (req,res,next) => {
      const body = req.body;
      let result = await recruitmentProvider.savePakals(body);
      if(!result.error)
         res.status(200).send(result);
      else
         res.status(500).send("error occurd");
   },
   saveWarehouseUnit: async (req,res,next) => {
      const body = req.body;
      let result = await recruitmentProvider.saveWarehouseUnit(body);
      if(!result.error)
         res.status(200).send(result);
      else
         res.status(500).send("error occurd");
   },
   getWarehouseUnit: async (req,res,next) => {
      const taskId = req.query.taskId;
      let result = await recruitmentProvider.getWarehouseUnit(taskId);
      if(!result.error)
         res.status(200).send(result);
      else
         res.status(500).send("error occurd");
   },
   getAllocatePakalBattlion: async (req,res,next) => {
      const taskId = req.query.taskId;
      let result = await recruitmentProvider.getAllocatePakalBattlion(taskId);
      if(!result.error)
         res.status(200).send(result);
      else
         res.status(500).send("error occurd");
   },
   getPakalsFull: async (req,res,next) => {
      const result = await recruitmentProvider.getPakalsFull();
      res.status(200).send(result);
   },
   getPakals: async (req,res,next) => {
      const result = await recruitmentProvider.getPakals();
      res.status(200).send(result);
   },
   getMaxPakalId: async (req,res,next) => {
      const result = await recruitmentProvider.getMaxPakalId();
      res.status(200).send(result);
   }
   ,
   getMaxSignatureItemId: async (req,res,next) => {
      const result = await recruitmentProvider.getMaxSignatureItemId();
      res.status(200).send(result);
   }
}