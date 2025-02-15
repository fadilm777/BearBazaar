const ApiError = require("./ApiError");

function controller(myController) {
  return async (req, res) => {
    try {
      await myController(req, res);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.code).send({ error: true, message: error.message });
      } else {
        res.status(500).send({ error: true, message: "Internal Error" });
      }
    }
  };
}

module.exports = controller;
