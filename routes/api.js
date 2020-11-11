const { request } = require('express');
const express = require('express');
const router = express.Router();

// User Model
const User = require('../models/Model');

router.get('/', (req, res) => {
    User.find({})
    .then(data => res.json(data))
    .catch(err => console.log('Error GET: ', err));
})

router.post('/User', (req, res) => {
    User.create(req.body)
    .then(data => {
        res.json(data)
        console.log('Success PUT: ', req.body);
    })
    .catch(err => console.log('Error PUT: ', err));
});

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
      { safe: true, upsert: true },
      (error, data) => {
        if(error){
          console.log("error PUT: ", error)
        } else {
          res.send(data);
          console.log("Success PUT", data)
        }
      }
    ).then(data => {
      console.log("Data promise: ", data);
    })
    .catch(err => console.log("Error Catch: ", err))
});

// Update recent search
router.put('/updateRecentSearch', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $push: { recent_search: req.body.recent_search } },
    { safe: true, upsert: true },
    (error, data) => {
      if(error){
        console.log("error PUT: ", error)
      } else {
        res.send(data);
        console.log("Success PUT", data)
      }
    }
  ).then(data => {
    console.log("Data promise: ", data);
  })
  .catch(err => console.log("Error Catch: ", err))
})

module.exports = router;