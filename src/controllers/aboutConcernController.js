const aboutConcernService = require('../services/aboutConcernService');

class aboutConcernController {
  async listConcern (req, res) {
    const {username} = req.query;
    const result = await aboutConcernService.listConcern(username);
    res.send(result);
  }

  async listConcerned (req, res) {
    const {username} = req.query;
    const result = await aboutConcernService.listConcerned(username);
    res.send(result);
  }

  async addConcern (req, res) {
    const {
      username,
      username_concerned,
      Avatar,
      Avatar_concerned
    } = req.body;

    await aboutConcernService.addConcern(      
      username,
      username_concerned,
      Avatar,
      Avatar_concerned
    )
    
    const concernedNumber = await aboutConcernService.returnConcernedNumber(username_concerned);
    res.send({
      username_concerned: username_concerned,
      concerned_num: concernedNumber
    })
  }

  async cancelConcern (req, res) {
    const {
      username,
      username_concerned,
      Avatar,
      Avatar_concerned
    } = req.body;

    await aboutConcernService.cancelConcern(      
      username,
      username_concerned,
      Avatar,
      Avatar_concerned
    )
    
    const concernedNumber = await aboutConcernService.returnConcernedNumber(username_concerned);
    res.send({
      username_concerned: username_concerned,
      concerned_num: concernedNumber
    })
  }

  async isConcern (req, res) {
    const {username, username_concerned} = req.body;
    const result = await aboutConcernService.isConcern(username, username_concerned);
    res.send({
      is_concern: result
    })
  }
}

module.exports = new aboutConcernController();