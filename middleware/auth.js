const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, "hello");
    req.username = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token not valid" });
  }
}

module.exports = auth;
