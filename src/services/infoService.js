const {
  InfoTable
} = require('../models/Table');

class infoService {
  // 列出用户[不管是自己还是别人]信息 [没有关注数和粉丝数]
  async listUserInfo (username) {
    const res = await InfoTable.where({
      username: username
    }).findOne();

    return res
  }
  // 修改个人信息
  async updateUserInfo (newInfo) {
    const res = await InfoTable.where({
      username: newInfo.username
    }).findOne();

    console.log(newInfo);

    res.Avatar = newInfo.Avatar;
    res.address = newInfo.address;
    res.signature = newInfo.signature;

    const result = await InfoTable.save(res);
    return result;
  }

  async addNewInfo (username) {
    const res = await InfoTable.save({
      username: username,
      Avatar: 'https://bk201-drama.app.cloudendpoint.cn/uploads/1644585241674.jpg',
      address: 'none',
      join_time: 1644585305,
      signature: '我的低调，不是你们装逼的资本'
    })
    return res;
  }
}

module.exports = new infoService();