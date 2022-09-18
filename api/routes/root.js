const { Router } = require('express');
const router = new Router();

router.get('/', (req, res) => {
    return res.status(200).send({
        status: 200,
        message: 'OK',
        content: 'Hello world!',
    });
});

module.exports = router;