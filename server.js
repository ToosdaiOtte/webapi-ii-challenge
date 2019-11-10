const express = require('express');

const dataRouter = require('./data/db-router.js');
const server = express();

server.use(express.json());

server.use('/api/posts', dataRouter);

dataRouter.get('/', (req, res) => {
    res.send(`
        <h2>We Made It!</h2>
        <p>Welcome to the api data</p>
    `);
});

module.exports = server;