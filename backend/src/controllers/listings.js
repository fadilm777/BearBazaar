const controller = require("../utils/controller");
const service = require("../services/listings");

async function create(req, res) {
  const { listing } = req.body;

  // const userId = req.session.userId;
  const userId = 1; // TODO: don't hardcode

  const id = await service.create(userId, listing);

  res.send({ id });
}

module.exports = {
  create: controller(create),
};
