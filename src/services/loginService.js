const {
  UserTable
} = require('../models/Table');

class loginService {
  async updatePassword (username, newPwd) {
    const res = await UserTable.where({
      username: username
    }).findOne();

    res.password = newPwd;
    const result = await UserTable.save(res);
    return result;
  }

  async sign (newUsername, newPwd) {
    const res = await UserTable.save({
      username: newUsername,
      password: newPwd
    });
    return res;
  }

  async login (username, password) {
    const res = await UserTable.where({
      username: username,
      password: password
    }).findOne();
    return res;
  }
}

module.exports = new loginService();