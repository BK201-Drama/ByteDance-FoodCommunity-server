const {
  MenuTable
} = require('../models/Table');

class menuService {
  async addMenu (MenuObject) {
    const res = await MenuTable.save({
      username: MenuObject.username,
      menu_id: '123',
      title: MenuObject.title,
      menu_pic: MenuObject.menu_pic,
      synopsis: MenuObject.synopsis,
      material: MenuObject.material,
      practice: MenuObject.practice,
      classification: MenuObject.classification,
      Tips: MenuObject.Tips,
      like_num: 0
    });

    res.menu_id = String(res._id);
 
    const result = await MenuTable.save(res);

    return result;
  }

  async deleteMenu (username, menu_id) {

    console.log(username, menu_id);
    const res = await MenuTable.where({
      username,
      menu_id
    }).find();

    const deleteNum = await MenuTable.delete(res);
    return {
      ...deleteNum,
      data: res
    };
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

  async showMenu (menu_id) {
    const res = await MenuTable.where({
      menu_id: menu_id
    }).findOne();

    return res;
  }

  async showMenuPart (menu_id) {
    const res = await MenuTable.where({
      menu_id: menu_id
    }).projection({
      menu_id: 1,
      title: 1,
      synopsis: 1,
      menu_pic: 1,
      like_num: 1
    }).findOne();
    
    return res;
  }

  async menuList () {
    const res = await MenuTable.where().projection({
      menu_id: 1,
      username: 1,
      title: 1,
      synopsis: 1,
      menu_pic: 1,
      like_num: 1
    }).find();
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

  /**
   * 这个部分可能会有一些问题，all方法的使用的问题
   */
  async searchMenuByTag (classify_name) {
    const res = await MenuTable.where({}).projection({
      menu_id: 1,
      title: 1,
      synopsis: 1,
      menu_pic: 1,
      classification: 1,
      like_num: 1
    }).find();

    const resp = res.filter((item) => {
      let classification = item.classification;

      for (let arr_item of classification) {

        if (arr_item.classify_name === classify_name) {
          return true;
        }
      }
      return false;
    });

    return resp;
  }
}

module.exports = new menuService();