const menuService = require('../services/menuService');
const commentService = require('../services/commentService');
const loginService = require('../services/loginService');

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
    await commentService.addContainer(menu_pic);
    // const k = await commentService.
    res.send(result);
  }

  async deleteMenu (req, res) {
    const {
      username,
      menu_id
    } = req.body;

    const result = await menuService.deleteMenu(username, menu_id);
    await commentService.deleteContainer(menu_id);
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
    const list = await Promise.all(
      result.map(async (item) => {
        const Avatar = await loginService.showUserAvatar(item.username);
        return {
          ...item,
          Avatar: Avatar.Avatar
        }
      })
    );
    res.send(list);
  }

  async listMenuByTag (req, res) {
    const {
      classify_name
    } = req.query;

    const result = await menuService.searchMenuByTag(classify_name);
    res.send(result);
  }

  async avatar (req, res) {
    const { username } = req.query;
    const result = await loginService.showUserAvatar(username);
    res.send(result)
  }

  async searchMenu (req, res) {
    const { input } = req.body;
    const result = await menuService.searchMenuByInput(input);
    res.send(result);
  }
}

module.exports = new menuController();