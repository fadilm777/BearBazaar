const controller = require("../utils/controller");
const service = require("../services/listings");

async function create(req, res) {
  const { listing } = req.body;

  const userId = req.session.userId;
  const id = await service.create(userId, listing);

  res.send({ id });
}

module.exports = {
  create: controller(create),
};
