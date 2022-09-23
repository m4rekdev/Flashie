const { Client } = require('discord.js');
const { end, log } = require('../utils/logger.js');
const slashsync = require('../utils/slashsync.js');
const { AutoPoster } = require('topgg-autoposter');
const { Presence, TopGGToken } = require('../config.js');

module.exports = {
    name: 'ready',
    once: true,

    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        end('Discord', `Successfully connected to Discord API! (${client.user.tag}) (${client.user.id})`, 'blue');

        client.user.setPresence({
            activities: [{
                name: Presence.Name,
                type: Presence.Type,
            }], 
            status: Presence.Status,
        });

        const topgg = AutoPoster(TopGGToken, client);
        topgg.on('posted', () => log('Top.GG', 'Posted bot statistics!', 'green'))
            .on('error', (error) => log('Top.GG', `Failed to post bot statistics! ${error.message}`, 'red'));

        await slashsync(client);
    },
};
