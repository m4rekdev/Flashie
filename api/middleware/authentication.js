const { request, response } = require('express');
const client = require('../../app.js');

/**
 * @param {request} req 
 * @param {response} res 
 */
module.exports = (req, res, next) => {
    const token = client.serverToken;
    const providedToken = req.headers.authorization;

    if (token == providedToken) return next();

    return res.status(401).send({
        status: 401,
        message: 'You need a token for this endpoint!',
    });
};