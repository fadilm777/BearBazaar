const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const db = require("../db");
const ApiError = require("../utils/ApiError");

/**
 * Save a file to the uploads dir.
 *
 * @param {number} userId 
 * @param {Buffer} buffer 
 * @param {string} mime 
 * @returns {Promise<string>} fileId
 */
async function save(userId, buffer, mime) {
  const fileId = crypto.randomUUID();

  await db.image.create({
    data: {
      id: fileId,
      userId,
      mime,
    },
  });

  await fs.writeFile('uploads/' + fileId, buffer);

  return fileId;
}

async function get(id) {
  const exists = await db.image.findUnique({ where: { id } });
  if (!exists) {
    throw new ApiError(404, "Not Found");
  }

  const buffer = await fs.readFile('uploads/' + id);
  return buffer;
}

module.exports = {
  save,
  get,
};
