const db = require("../db");

async function create(userId, listing) {
  console.log({
    title: listing.title,
    description: listing.description,
    price: listing.price,
    sellerId: userId,
  });
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
  create,
};
