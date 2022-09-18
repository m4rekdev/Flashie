const client = require('../app.js');
const { EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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
            .setDescription('During the processing of this action, an error occurred. It would be appreciated if you would report this error on our Github page.'),
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

    PING: 'Pong!',
    PING_BUTTON: new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId('ping')
        .setLabel('Ping')
        .setEmoji('🏓'),
};