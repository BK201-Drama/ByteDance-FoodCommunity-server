const loginService = require('../services/loginService');
const infoService = require('../services/infoService');
const aboutConcernService = require('../services/aboutConcernService');

class loginController {
  async login (req, res) {
    const {username, password} = req.body;

    const result = await loginService.login(username, password);
    res.send({
      data: result
    });
  }

  async sign (req, res) {
    const {username, password} = req.body;

    const result = await loginService.sign(username, password);
    await infoService.addNewInfo(username);
    await aboutConcernService.createNewPeople(username);
    res.send({
      data: result
    });
  }

  async updatePassword (req, res) {
    const {username, password, newPwd} = req.body;

    const result = await loginService.updatePassword(username, password, newPwd);
    res.send(result);
  }

  async Avatar (req, res) {
    const { username } = req.query;
    const result = await loginService.showUserAvatar(username);
    res.send(result);
  }
}

module.exports = new loginController();