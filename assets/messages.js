const client = require('../app.js');
const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Emoji } = require('./enums.js');

module.exports = {
    GUILD_ONLY: new EmbedBuilder()
        .setColor(client.accentColor)
        .setTitle('Sorry, but this command can only be used in servers.'),
    
    NO_RESULTS:
        new EmbedBuilder()
            .setColor(client.accentColor)
            .setTitle('Error')
            .setDescription('Couldn\'t find any matches to your search!'),

    /**
     * 
     * @param {number} errorId The Error ID
     * @returns {EmbedBuilder} Discord Embed object
     */
    ERROR_USER: (errorId) => ({
        embed: new EmbedBuilder()
            .setColor(client.accentColor)
            .setTitle(`Error`)
            .addFields([
                {
                    name: `Error ID`,
                    value: errorId,
                },
            ])
            .setDescription('An error occurred during the processing of this action. It would be appreciated if you report this error on our GitHub page.'),
        button: new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`${client.repositoryUrl}/issues/new?template=bug_report.md`)
            .setLabel('Report error'),
    }),

     /**    
     * 
     * @param {number} executorId ID of the executor
     * @param {string} executorUsername Username of the executor
     * @param {string} executorAvatar URL of the executor's avatar
     * @param {string} actionType The Action Type
     * @param {string} actionName The Action Name
     * @returns {object} Discord Embed object
     */
    ERROR_REPORT: (executorId, executorUsername, executorAvatar, actionType, actionName) =>
        new EmbedBuilder()
            .setColor(client.accentColor)
            .setTitle('Error')
            .setAuthor({
                name: `${executorUsername} (${executorId})`,
                iconURL: executorAvatar,
            })
            .addFields(
                {
                    name: 'Action',
                    value: `${actionName} (${actionType})`,
                },
            )
            .setTimestamp(),

    /**
     * 
     * @param {number} totalLatency The total latency of the action
     * @param {number} discordLatency Discord latency
     * @param {number} wsLatency Websocket latency
     * @param {number} uptime Bot's uptime
     * @returns {object} Discord Embed object
     */
    STATS: (totalLatency, discordLatency, wsLatency, uptime) =>
        new EmbedBuilder()
            .setColor(client.accentColor)
            .setTitle('Stats')
            .setDescription(`🏓 **Ping**
            > Total Latency: ${totalLatency}ms
            > Discord Latency: ${discordLatency}ms
            > WS Latency: ${wsLatency}ms

            🕛 __Uptime__ 🕛
            > ${uptime}`)
            .setTimestamp(),
    /**
     * 
     * @param {number} totalLatency The total latency of the action
     * @param {number} discordLatency Discord latency
     * @param {number} wsLatency Websocket latency
     * @param {number} uptime Bot's uptime
     * @returns {object} Discord Embed object
     */
    COZY: (attachmentName, platform, target) =>
        new EmbedBuilder()
            .setColor(client.accentColor)
            .setTitle('Cozy')
            .setDescription(`You're looking cozy today! ${Emoji.KITTY_COMFY}`)
            .addFields(
                { name: 'Platform', value: platform, inline: true },
                { name: 'Target', value: target, inline: true },
            )
            .setImage(`attachment://${attachmentName}`),
};