const {
  UserTable
} = require('../models/Table');

class loginService {
  async updatePassword (username, password, newPwd) {
    const res = await UserTable.where({
      username: username,
      password: password
    }).findOne();

    res.password = newPwd;
    const result = await UserTable.save(res);
    return result;
  }

  async sign (newUsername, newPwd) {
    const res = await UserTable.save({
      username: newUsername,
      password: newPwd,
      Avatar: 'https://bk201-drama.app.cloudendpoint.cn/uploads/1645016155726.jpg'
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

  async showUserAvatar (username) {
    const res = await UserTable.where({
      username: username
    }).projection({
      Avatar: 1
    }).findOne();
    return res;
  }
}

module.exports = new loginService();