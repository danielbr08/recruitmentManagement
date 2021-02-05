// const { wrap } = require('../services/error-wrap')
const recruitmentProvider = require('../providers/recruitmentProvider');

module.exports = {
   getUsersList: async (req,res,next) => {
      const result = await recruitmentProvider.getUsersList();
      res.status(200).send(result);
   }
}