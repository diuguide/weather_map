const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../models/Model");

// Get All User Data
router.get("/", (req, res) => {
  User.find({})
    .then((data) => res.json(data))
    .catch((err) => console.log("Error GET: ", err));
});

// Create New User
router.post("/User", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Please Enter username and password" });
  }
  User.findOne({ username }).then((user) => {
    if (!user)
      return res.status(400).json({ msg: "Username does not exsist!" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

      jwt.sign({ id: user.id }, "hello", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
          },
        });
      });
    });
  });
});

module.exports = router;
