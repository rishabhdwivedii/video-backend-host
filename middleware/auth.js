const jwt = require("jsonwebtoken");
const { Users } = require("../db");
require("dotenv").config();

const generateJwt = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

const userAuthentication = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username, password });
  if (user) {
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticateJwt,
  generateJwt,
  userAuthentication,
};
