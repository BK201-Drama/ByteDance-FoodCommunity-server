const menuService = require('../services/menuService');
const commentService = require('../services/commentService');

class menuController {
  async addMenu (req, res) {
    const {
      username,
      title,
      menu_pic,
      synopsis,
      material,
      practice,
      classification,
      Tips
    } = req.body;

    const result = await menuService.addMenu({
      username: username,
      title: title,
      menu_pic: menu_pic,
      synopsis: synopsis,
      material: material,
      practice: practice,
      classification: classification,
      Tips: Tips
    });

    res.send(result);
  }

  async deleteMenu (req, res) {
    const {
      username,
      menu_id
    } = req.body;

    const result = await menuService.deleteMenu(username, menu_id);
    res.send(result);
  }

  async updateMenu (req, res) {
    const {
      username,
      title,
      menu_pic,
      synopsis,
      material,
      practice,
      step,
      classification,
      Tips,
      like_num
    } = req.body;

    const result = await menuService.updateMenu({
      username,
      title,
      menu_pic,
      synopsis,
      material,
      practice,
      step,
      classification,
      Tips,
      like_num
    });
    res.send(result);
  }

  async likeMenu (req, res) {
    const {username, menu_id, like_num} = req.body;
    const result = await menuService.likeOtherMenu(username, menu_id, like_num);
    res.send(result);
  }

  async showMenu (req, res) {
    const {
      menu_id
    } = req.params;
    const result = await menuService.showMenu(menu_id);

    const comments = await commentService.listComment(menu_id);

    res.send({
      ...result,
      comments: comments
    });
  }

  async listAllMenu (req, res) {
    const result = await menuService.menuList();
    res.send(result);
  }

  async listMenuByTag (req, res) {
    const {
      classify_name
    } = req.query;

    const result = await menuService.searchMenuByTag(classify_name);
    res.send(result);
  }
}

module.exports = new menuController();