const {
  MenuLabelTable
} = require('../models/Table');

class menuLabelService {
  async listAllLabel () {
    const res = await MenuLabelTable.where().find();
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