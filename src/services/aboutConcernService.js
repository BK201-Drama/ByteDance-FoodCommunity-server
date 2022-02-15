const {
  AboutConcernTable
} = require('../models/Table');

class aboutConcernService {
  // 列出关注列表
  async listConcern (username) {
    const res = await AboutConcernTable.where({
      username: username
    }).findOne();

    return res.concern;
  }

  // 列出粉丝列表
  async listConcerned (username) {
    const res = await AboutConcernTable.where({
      username: username
    }).findOne();

    return res.concerned;
  }

  // 列出关注数目
  async returnConcernNumber (username) {
    const res = await AboutConcernTable.where({
      username: username
    }).findOne();

    return res.concern.length;
  }

  // 列出粉丝数目
  async returnConcernedNumber (username) {
    const res = await AboutConcernTable.where({
      username: username
    }).findOne();

    return res.concerned.length;
  }

  async addConcern (username, Avatar, ConcernObject) {
    const res = await AboutConcernTable.where({
      username: username
    }).findOne();

    res.concern.push({
      username: ConcernObject.username_concerned,
      Avatar: ConcernObject.Avatar_concerned
    })
    await AboutConcernTable.save(res)

    const res2 = await AboutConcernTable.where({
      username: ConcernObject.username_concerned
    }).findOne();

    res2.concerned.push({
      username: username,
      Avatar: Avatar
    })
    const result = await AboutConcernTable.save(res2)

    return result
  }

  async deleteConcern (username, ConcernObject) {
    const res = await AboutConcernTable.where({
      username: username
    }).findOne();

    res.concern = res.concern.filter((item) => {
      return item.username != ConcernObject.username_concerned; 
    })

    await AboutConcernTable.save(res)

    const res2 = await AboutConcernTable.where({
      username: ConcernObject.username_concerned
    }).findOne();
    res2.concerned = res2.concerned.filter((item) => {
      return item.username != username;
    })

    const result = await AboutConcernTable.save(res2);
    return result;
  }

  async isConcern (username, username_concerned) {
    const res = await AboutConcernTable.where({
      username: username
    }).findOne();

    if (res.concern.length <= 0) {
      return false;
    }

    for (let item of res.concern) {
      if (item.username !== username_concerned) {
        return false;
      }
    }
    return true;
  }
}

module.exports = new aboutConcernService();