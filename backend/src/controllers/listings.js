const controller = require("../utils/controller");
const service = require("../services/listings");
const prisma = require("../db");

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

async function search(req, res) {
  const { query } = req.query; // Get the search query from the request

  if (!query) {
    return res.status(400).send({ error: true, message: "Query parameter is required." });
  }

  const listings = await service.search(query); // Call the service to perform the search
  res.send({ listings });
}

const searchListings = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query parameter is required" });

  try {
    const listings = await prisma.listing.findMany({
      where: {
        title: { contains: query},
      },
    });

    if (!listings.length) {
      return res.status(404).json({ error: "No listings found" });
    }

    res.json({ listings });
  } catch (error) {
    console.error("Error in searchListings:", error); // Debugging log
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getFeed: controller(getFeed),
  getMine: controller(getMine),
  getOne: controller(getOne),
  create: controller(create),
  search: controller(search),
  searchListings: controller(searchListings),
};
