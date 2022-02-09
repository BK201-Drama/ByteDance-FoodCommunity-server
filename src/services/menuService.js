const {
  MenuTable
} = require('../models/Table')

class menuService {
  async addMenu (MenuObject) {
    const res = await MenuTable.create({
      username: MenuObject.username,
      menu_id: undefined,
      title: MenuObject.title,
      menu_pic: MenuObject.menu_pic,
      synopsis: MenuObject.synopsis,
      material: MenuObject.material,
      practice: MenuObject.practice,
      step: MenuObject.step,
      classification: MenuObject.classification,
      Tips: MenuObject.Tips,
      like_num: MenuObject.like_num
    });

    res.menu_id = res._id;
 
    const result = await MenuTable.save(res);

    return result;
  }

  async deleteMenu (username, menu_id) {
    const res = await MenuTable.where({
      username: username,
      menu_id: menu_id
    });

    const result = await MenuTable.delete(res);
    return result;
  }

  async updateMenu (MenuObject) {
    const res = await MenuTable.where({
      username: MenuObject.username,
      menu_id: MenuObject.menu_id
    }).findOne();

    res.username = MenuObject.username;
    res.title = MenuObject.title;
    res.menu_pic = MenuObject.menu_pic;
    res.synopsis = MenuObject.synopsis;
    res.material = MenuObject.material;
    res.practice = MenuObject.practice;
    res.step = MenuObject.step;
    res.classification = MenuObject.classification;
    res.Tips = MenuObject.Tips;
    res.like_num = MenuObject.like_num;

    const result = await MenuTable.save(res);

    return result;
  }

  async likeOtherMenu (username, menu_id, like_num) {
    const res = await MenuTable.where({
      username: username,
      menu_id: menu_id
    }).findOne();
    res.like_num = like_num;
    const result = await MenuTable.save(res);
    return result;
  }

  async showMenu (username, menu_id) {
    const res = await MenuTable.where({
      username: username,
      menu_id: menu_id
    }).findOne();

    return res;
  }

  async menuList () {
    const res = await MenuTable.where().find();
    return res;
  }

  async menuListByUser (username) {
    const res = await MenuTable.where({
      username: username
    }).projection({
      menu_id: 1,
      title: 1,
      synopsis: 1,
      menu_pic: 1,
      like_num: 1
    }).find();
    
    return res;
  }

  async searchMenuByLabel () {
    
  }
}

module.exports = new menuService();