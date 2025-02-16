const prisma = require("../db"); // Ensure Prisma is imported

const getUserProfile = async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        profilePic: true,
      },
    });
    if (!user) raise ApiError(404, "User not found");

    res.send({
      id: user.id,
      username: user.username,
      name: user.name || "Not Provided",
      email: user.email,
      profilePic: user.profilePic ? `/uploads/${user.profilePic}` : "/uploads/default.png",
    });
};

module.exports = { getUserProfile: controller(getUserProfile) };
