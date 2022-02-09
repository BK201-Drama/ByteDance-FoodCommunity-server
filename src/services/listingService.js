const {
  ListingTable
} = require('../models/Table');

class listingService {
  async isListing (username, menu_id) {
    const res = await ListingTable.where({
      username: username,
      menu_id: menu_id
    }).find();
    return res.length >= 1 ? true : false;
  }

  async listingList (username) {
    const res = await ListingTable.where({
      username: username
    }).find();
    
    return res;
  }

  async addListing (username, menu_id) {
    const res = await ListingTable.save({
      username: username,
      menu_id: menu_id
    });

    return res;
  }

  async deleteListing (username, menu_id) {
    const res = await ListingTable.where({
      username: username,
      menu_id: menu_id
    }).findOne();

    await GoodsTable.delete(res);

    return res;
  }
}

module.exports = new listingService();