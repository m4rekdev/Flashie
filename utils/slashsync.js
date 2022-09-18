const { Client } = require('discord.js');
const { InteractionType } = require('../assets/enums');
const { log } = require('./logger.js');

/**
 * @param {Client} client 
 */
module.exports = (client) => new Promise((resolve, reject) => {
    const commands = client.interactions[InteractionType.APPLICATION_COMMAND].map(({ data }) => {
        let { name, description, type, options } = data;
        description = description.split('\n')[0].substring(0, 100);

        return { name, description, type, options };
    });

    try {
        client.application.commands.set(commands);
        client.application.commands.set(commands, client.testGuildId);

        log('Discord', 'Successfully refreshed application commands!', 'blue');
        resolve(commands);
    } catch (error) {
        log('Discord', `While refreshing application commands, an error occured! ${error.stack}`, 'red');
        reject(error);
    }
});
