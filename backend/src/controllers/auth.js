const controller = require("../utils/controller");
const service = require("../services/auth");

async function getMe(req, res) {
  const user = await service.getMe(req.session.userId);
  res.send({ user });
}

async function login(req, res) {
  const { email, password } = req.body;

  const session = await service.login(email, password);

  res.send({ session });
};

async function register(req, res) {
  const { email, username, password } = req.body;

  const session = await service.register(email, username, password);

  res.send({ session });
}

module.exports = {
  login: controller(login),
  register: controller(register),
  getMe: controller(getMe),
};
