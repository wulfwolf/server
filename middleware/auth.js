const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "access token not found" });
  }
  try {
    const decoded = jwt.verify(token, "sjdlkasjdlkajsdlkjasdlaskld2");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, message: "invalid token" });
  }
};

module.exports = verifyToken;
