const controller = require("../utils/controller");
const service = require("../services/auth");

async function login(req, res) {
  const { email, password } = req.body;

  const session = await service.login(email, password);

  res.send({ session });
};

module.exports = {
  login: controller(login),
};
