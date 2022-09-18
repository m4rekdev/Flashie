const { Router } = require('express');
const router = new Router();
const client = require('../../app.js');
const authentication = require('../middleware/authentication.js');

router.get('/botstats', authentication, async (req, res) => {
    const { uptime, user } = client;

    return res.status(200).send({
        status: 200,
        message: 'OK',
        content: {
            uptime,
            user,
        },
    });
});

module.exports = router;