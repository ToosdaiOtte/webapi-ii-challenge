const express = require('express');

const router = express.Router();
const Data = require('./db.js');

router.get('/', (req, res) => {
    Data.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            error:  "The posts information could not be retrieved.",
            err
        });
    });
});

module.exports = router;