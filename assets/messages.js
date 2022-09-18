const client = require('../app.js');
const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const formatDuration = require('../utils/formatDuration.js'); 

module.exports = {
    GUILD_ONLY: new EmbedBuilder()
        .setColor(client.accentColor)
        .setTitle('Sorry, but this command can only be used in servers.'),

    /**
     * 
     * @param {number} errorId The Error ID
     * @returns {EmbedBuilder} Discord Embed object
     */
    ERROR_USER: (errorId) => ({
        embed: new EmbedBuilder()
            .setColor(client.accentColor)
            .setTitle(`Error #${errorId}`)
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
     * @param {string} executorTag Tag and username of the executor
     * @param {string} executorAvatar URL of the executor's avatar
     * @returns {object} Discord Embed object
     */
    PING: (executorTag, executorAvatar, createdTimestamp) =>
        new EmbedBuilder()
            .setColor(client.accentColor)
            .setTitle(`Ping`)
            .setAuthor({
                name: `${executorTag}`,
                iconURL: executorAvatar,
            })
            .setDescription(`🏓 **Pong!**
            > Latency: ${Date.now() - createdTimestamp + `ms`}
            > API Latency: ${Math.round(client.ws.ping) + `ms`}`)
            .setTimestamp(),

    /**
     * 
     * @param {string} executorTag Tag and username of the executor
     * @param {string} executorAvatar URL of the executor's avatar
     * @returns {object} Discord Embed object
     */
     STATS: async (executorTag, executorAvatar, createdTimestamp) =>
        new EmbedBuilder()
            .setColor(client.accentColor)
            .setTitle(`Stats`)
            .setAuthor({
                name: `${executorTag}`,
                iconURL: executorAvatar,
            })
            .setDescription(`🏓 **Ping**
            > Latency: ${Date.now() - createdTimestamp + `ms`}
            > API Latency: ${Math.round(client.ws.ping) + `ms`}
            
            🕛 __Uptime__ 🕛
            > ${await formatDuration.format(client.uptime)}`)
            .setTimestamp(),

    // PING_BUTTON: new ButtonBuilder()
    //     .setStyle(ButtonStyle.Primary)
    //     .setCustomId('ping')
    //     .setLabel('Ping')
    //     .setEmoji('🏓'),
};