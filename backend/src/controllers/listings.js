const controller = require("../utils/controller");
const service = require("../services/listings");

async function getFeed(req, res) {
  const listings = await service.getFeed(req.session.userId);
  res.send({ listings });
}

async function getMine(req, res) {
  const listings = await service.getMine(req.session.userId);
  res.send({ listings });
}

async function getOne(req, res) {
  let id;
  try {
    id = parseInt(req.params.id);
  } catch (error) {
    return res.status(400).send({ error: true, message: "Id must be an integer" });
  }

  const listing = await service.getOne(req.session.userId, id);
  res.send({ listing });
}

async function create(req, res) {
  const { listing } = req.body;
  const id = await service.create(req.session.userId, listing);
  res.send({ id });
}

module.exports = {
  getFeed: controller(getFeed),
  getMine: controller(getMine),
  getOne: controller(getOne),
  create: controller(create),
};
