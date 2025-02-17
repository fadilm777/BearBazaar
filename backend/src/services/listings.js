const db = require("../db");

async function getFeed(userId) {
  const listings = await db.listing.findMany({
    where: {
      NOT: { sellerId: userId },
    },
  });
  return listings;
}

async function getMine(userId) {
  const listings = await db.listing.findMany({
    where: {
      sellerId: userId,
    },
  });
  return listings;
}

async function getOne(userId, listingId) {
  const listing = await db.listing.findUnique({
    select: {
      title: true,
      description: true,
      price: true,
      image: true,
      location: true,
      createdAt: true,
      updatedAt: true,
      seller: true,
      conversations: {
        where: {
          members: {
            some: {
              id: userId,
            },
          },
        },
      },
    },
    where: {
      id: listingId,
    },
  });
  return listing;
}

async function create(userId, listing) {
  const created = await db.listing.create({
    data: {
      title: listing.title,
      description: listing.description,
      price: listing.price,
      seller: { connect: { id: userId } },
    },
  });

  return created.id;
}

module.exports = {
  getFeed,
  getMine,
  getOne,
  create,
};
