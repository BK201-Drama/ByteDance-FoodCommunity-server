const infoService = require('../services/infoService');
const aboutConcernService = require('../services/aboutConcernService');
const menuService = require('../services/menuService');

class infoController {
  async listInfo (req, res) {
    const {username} = req.query;
    const info = await infoService.listUserInfo(username);
    const concernNumber = await aboutConcernService.returnConcernNumber(username);
    const concernedNumber = await aboutConcernService.returnConcernedNumber(username);
    res.send({
      ...info,
      concern_num: concernNumber,
      concerned_num: concernedNumber
    })
  }

  async listMyMenu (req, res) {
    const {username} = req.query;
    const menuList = await menuService.menuListByUser(username);
    res.send({
      username: username,
      menu_list: menuList
    })
  }

  async listMyCookingWork (req, res) {

  }

  async updateMyInfo (req, res) {
    const {
      username,
      Avatar,
      address,
      join_time,
      concern_num,
      concerned_num,
      signature
    } = req.body;

    const result = await infoService.updateUserInfo ({
      username: username,
      Avatar: Avatar,
      address: address,
      join_time: join_time,
      concern_num: concern_num,
      concerned_num: concerned_num,
      signature: signature
    });

    res.send(result);
  }
}

module.exports = new infoController();