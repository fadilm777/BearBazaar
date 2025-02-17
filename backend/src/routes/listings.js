const express = require("express");
const authMiddleware = require("../middleware/auth");
const controller = require("../controllers/listings");
const listingsController = require("../controllers/listings.js");

const router = express.Router();

router.get('/feed', authMiddleware, controller.getFeed);
router.get('/mine', authMiddleware, controller.getMine);
router.get('/details/:id', authMiddleware, controller.getOne);
router.post('/', authMiddleware, controller.create);
// router.get('/search', authMiddleware, controller.search);
router.get("/search", listingsController.searchListings);

module.exports = router;
