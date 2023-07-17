const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(400).send("No token provided!");

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decode.userId;
    next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = auth;
