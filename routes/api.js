const express = require('express');
const User = require('../models/Model');
const router = express.Router();

router.get('/User', (req, res) => {
    User.find({})
    .then(data = res.json(data))
    .catch(err => console.log('Error GET: ', err));
});

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

module.exports = router;