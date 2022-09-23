const { User, Message, EmbedBuilder } = require('discord.js');
const client = require('../app.js');
const { log } = require('./logger.js');
const { ERROR_USER, ERROR_REPORT } = require('../assets/messages.js');
const { SupportServer } = require('../config.js');

/**
 * @param {User} executor The executor of the action
 * @param {Error} error The Error object
 * @param {object} action The action action
 * @returns {Promise<EmbedBuilder>} Returns the error embed
 */
function userReport(executor, error, action) {
    return new Promise(async (resolve) => {
        error = error.stack || error.message || error;
        log('Error', error, 'red');
    
        serverReport(error, executor, action).then(message => {
            return resolve(ERROR_USER(message.id));
        }).catch(error => log('Error', `Failed reporting the error to the Discord server! ${error.stack}`, 'red'));
    })
};

/**
 * @param {Error} error The Error object
 * @param {number} errorId The Error ID
 * @param {User} executor The executor of the action
 * @param {object} action The action object
 * @returns {Promise<Message>} Returns the error report Message
 */
function serverReport(error, executor, action) {
    return new Promise(async (resolve, reject) => {
        const channelId = SupportServer.Channels.ErrorReports;

        client.channels.fetch(channelId).then(channel => {
            const reportEmbed = ERROR_REPORT(executor.id, executor.tag, executor.avatarURL() || executor.defaultAvatarURL, action.type, action.name);
            const stackFile = {
                name: 'stack.txt',
                description: 'The Error stack file.',
                attachment: Buffer.from(error),
            };
    
            resolve(channel.send({ embeds: [ reportEmbed ], files: [ stackFile ] }));
        }).catch(apiError => reject(apiError));
    })
};

module.exports = userReport;