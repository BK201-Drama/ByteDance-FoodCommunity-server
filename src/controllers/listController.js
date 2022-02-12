const listingService = require('../services/listingService');
const menuService = require('../services/menuService');

class listController {
  async addListing (req, res) {
    const {username, menu_id} = req.body;
    await listingService.addListing(username, menu_id);
    const myList = await listingService.listingList(username);

    const result = await Promise.all(
      myList.map(async (item) => {
        const res = await menuService.showMenuPart(item.menu_id);
        return res;
      })
    )

    res.send({
      username: username,
      listing: result
    });
  }

  async cancelListing (req, res) {
    const {username, menu_id} = req.body;
    await listingService.deleteListing(username, menu_id);
    const myList = await listingService.listingList(username);

    const result = await Promise.all(
      myList.map(async (item) => {
        const res = await menuService.showMenuPart(item.menu_id);
        return res;
      })
    )

    res.send({
      username: username,
      listing: result
    });
  }

  async showListingList (req, res) {
    const {username} = req.query;

    const myList = await listingService.listingList(username);
    const result = await Promise.all(
      myList.map(async (item) => {
        const res = await menuService.showMenuPart(item.menu_id);
        return res;
      })
    );

    res.send({
      username: username,
      listing: result
    });
  }

  async isListing (req, res) {
    const {username, menu_id} = req.query;

    const isListed = await listingService.isListing(username, menu_id);

    res.send({
      isListed: isListed
    })
  }
}

module.exports = new listController();