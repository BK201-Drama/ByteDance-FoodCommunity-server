const loginService = require('../services/loginService');

class loginController {
  async login (req, res) {
    const {username, password} = req.body;

    const result = await loginService.login(username, password);
    if (result.length) {
      res.send({
        message: "no"
      })
    }
    res.send(result);
  }

  async sign (req, res) {
    console.log(req.username);
    const {username, password} = req.body;

    const result = await loginService.sign(username, password);
    res.send({
      data: result
    });
  }

  async updatePassword (req, res) {
    const {username, password, newPwd} = req.body;

    const result = await loginService.updatePassword(username, password, newPwd);
    res.send(result);
  }
}

module.exports = new loginController();