const menuLabelService = require('../services/menuLabelService');

class menuLabelController {
  async listAllLabel (req, res) {
    const result = await menuLabelService.listAllLabel();
    res.send(result);
  }

  async findLabel (req, res) {
    const {
      menu_label_id
    } = req.query;

    const result = await menuLabelService.findLabel(menu_label_id);
    res.send(result);
  }
}

module.exports = new menuLabelController();