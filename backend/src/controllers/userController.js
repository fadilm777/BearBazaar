const prisma = require("../db"); // Ensure Prisma is imported

const getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        profilePic: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user.id,
      username: user.username,
      name: user.name || "Not Provided",
      email: user.email,
      profilePic: user.profilePic ? `/uploads/${user.profilePic}` : "/uploads/default.png",
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getUserProfile };
