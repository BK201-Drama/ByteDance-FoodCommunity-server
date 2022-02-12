const {
  MenuLabelTable
} = require('../models/Table');

class menuLabelService {
  async listAllLabel () {
    const res = await MenuLabelTable.where().projection({
      _id: 0,
      createdAt: 0,
      updatedAt: 0
    }).find();
    return res;
  }

  async findLabel (menu_label_id) {
    const res = await MenuLabelTable.where({
      menu_label_id: menu_label_id
    }).findOne();
    return res;
  }
}

module.exports = new menuLabelService();