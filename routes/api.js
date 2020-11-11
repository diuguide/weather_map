const express = require('express');
const router = express.Router();

// User Model
const User = require('../models/Model');

// Get All User Data
router.get('/', (req, res) => {
    User.find({})
    .then(data => res.json(data))
    .catch(err => console.log('Error GET: ', err));
})

// Create New User
router.post('/User', (req, res) => {
    User.create(req.body)
    .then(data => {
        res.json(data)
        console.log('Success PUT: ', req.body);
    })
    .catch(err => console.log('Error PUT: ', err));
});

// Delete User By ID
router.delete('/User/:id', (req, res) => {
    User.findOneAndDelete({ '_id': req.params.id })
    .then(data => res.json(data))
    .catch(err => console.log('Error DELETE: ', err))
});

// Update Home
router.put('/updateHome', (req, res) => {
    User.findOneAndUpdate(
      { username: req.body.username },
      { home: req.body.home },
      { safe: true, new: true },
      (error, data) => {
        if(error){
          console.log("error PUT: ", error)
        } else if (data === null) {
          res.send("Username does not exsist");
          console.log("Username does not exsist");
        } else {
          res.send(data);
          console.log("Home Updated: ", data)
        }
      }
    ).catch(err => console.log("Error Catch: ", err))
});

// Update Recent Search
router.put('/updateRecentSearch', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $addToSet: { recent_search: req.body.recent_search } },
    { safe: true, new: true },
    (error, data) => {
      if(error){
        console.log("error PUT: ", error)
      } else if (data === null) {
        res.send("Username does not exsist");
        console.log("Username does not exsist");
      } else {
        res.send(data);
        console.log("Success PUT", data)
      }
    }
  ).catch(err => console.log("Error Catch: ", err))
});

module.exports = router;