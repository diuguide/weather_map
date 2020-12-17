const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

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
  const { username, password, home } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Please Enter username and password" });
  }
  User.findOne({ username }).then((user) => {
    if (user) return res.status(400).json({ msg: "Username already exsists" });
    const newUser = new User({
      username,
      password,
      home,
    });

    // create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            "hello",
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  home: user.home
                },
              });
            }
          );
        });
      });
    });
  });
});

// Delete User By ID
router.delete("/User/:id", (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => console.log("Error DELETE: ", err));
});

// Update Home
router.put("/updateHome", auth, (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { home: req.body.home },
    { safe: true, new: true },
    (error, data) => {
      if (error) {
        console.log("error PUT: ", error);
      } else if (data === null) {
        res.send("Username does not exsist");
        console.log("Username does not exsist");
      } else {
        res.send(data);
        console.log("Home Updated: ", data);
      }
    }
  ).catch((err) => console.log("Error Catch: ", err));
});

// Update Recent Search
router.put("/updateRecentSearch", auth, (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $addToSet: { recent_search: req.body.recent_search } },
    { safe: true, new: true },
    (error, data) => {
      if (error) {
        console.log("error PUT: ", error);
      } else if (data === null) {
        res.send("Username does not exsist");
        console.log("Username does not exsist");
      } else {
        res.send(data);
        console.log("Success PUT", data);
      }
    }
  ).catch((err) => console.log("Error Catch: ", err));
});

module.exports = router;
