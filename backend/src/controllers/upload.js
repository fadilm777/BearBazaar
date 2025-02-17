const service = require("../services/upload");
const controller = require("../utils/controller");

async function get(req, res) {
  const { id } = req.params;
  const buffer = await service.get(id);
  res.send(buffer);
}

async function upload(req, res) {
  const buffer = req.body;
  const id = await service.save(req.session.userId, buffer, req.headers["content-type"]);
  res.send({ id });
}

module.exports = {
  get: controller(get),
  upload: controller(upload),
};
