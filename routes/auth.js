const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// User Model
const User = require("../models/Model");
const { findById } = require("../models/Model");

// Create New User
router.post("/User", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Please Enter username and password" });
  }
  User.findOne({ username }).then((user) => {
    if (!user)
      return res.status(400).json({ msg: "Username does not exsist!" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

      jwt.sign({ id: user.id }, "hello", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            recent_search: user.recent_search,
            home: user.home
          },
        });
      });
    });
  });
});

router.get('/User', auth, (req, res) => {
    User.findById(req.username.id)
    .select('-password')
    .then(user => res.json(user));
})

module.exports = router;
