const { request, response } = require('express');
const { ApiServer } = require('../../config.js');

/**
 * @param {request} req 
 * @param {response} res 
 */
module.exports = (req, res, next) => {
    const token = ApiServer.Token;
    const providedToken = req.headers.authorization;

    if (token == providedToken) return next();

    return res.status(401).send({
        status: 401,
        message: 'You need a token for this endpoint!',
    });
};