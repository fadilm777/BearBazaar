const prisma = require("../db"); // Ensure Prisma is imported
const ApiError = require("../utils/ApiError"); // Import ApiError for error handling
const controller = require("../utils/controller"); // Import controller wrapper

const getUserProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.session.userId },
    select: {
      id: true,
      username: true,
      email: true,
      profilePic: true,
    },
  });
  if (!user) throw new ApiError(404, "User not found");

  res.send({
    id: user.id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic ? `/uploads/${user.profilePic}` : "/uploads/default.png",
  });
};

module.exports = { getUserProfile: controller(getUserProfile) };
