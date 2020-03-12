'use strict';

const express = require('express');
const router = new express.Router();
const search = require('../search/search')

router.get("/", async (req, res) => {
    res.send("ok")
});

router.get('/search/:query', async (req, res) => {
    const searchQuery = req.params.query;

    try {
        const result = await search(searchQuery);

        res.send(result)
    } catch {
        res.status(400).send({
            error: "Unknown error happened",
            status: 400
        });
    }

});


module.exports = router;