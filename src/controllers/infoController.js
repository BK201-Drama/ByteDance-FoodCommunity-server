const infoService = require('../services/infoService');
const aboutConcernService = require('../services/aboutConcernService');
const menuService = require('../services/menuService');
const { updateUserInfo } = require('../services/infoService');

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

    const result = await updateUserInfo ({
      username,
      Avatar,
      address,
      join_time,
      concern_num,
      concerned_num,
      signature
    });

    res.send(result);
  }
}

module.exports = new infoController();