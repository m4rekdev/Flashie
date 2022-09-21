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
            ),

    STATS_RECORDING: 'While the statistics are initializing, please wait.',

    /**
     * 
     * @param {object} bot Object with bot details
     * @param {object} latency Object with latency details
     * @param {object} server Object with server details
     * @returns {object} Discord Embed object
     */
    STATS: (bot = { discordJsVersion, uptime }, latency = { total, discord, websocket }, server = { cpu: { cores, model, speed }, memory: { total, usage }}) =>
        new EmbedBuilder()
            .setColor(client.accentColor)
            .addFields([
                {
                    name: 'Bot statistics',
                    value: `\`\`\`asciidoc\nFramework :: Discord.JS ${bot.discordJsVersion}\nUptime :: ${bot.uptime}\nGuilds :: ${bot.guilds} guilds\nUsers :: ${bot.users} users\`\`\``,
                },
                {
                    name: 'Latency details',
                    value: `\`\`\`asciidoc\nTotal latency :: ${Object.values(latency).reduce((accumulator, value) => accumulator + value, 0)}ms\nDiscord latency :: ${latency.discord}ms\nWebSocket latency :: ${latency.websocket}ms\`\`\``,
                },
                {
                    name: 'Server statistics',
                    value: `\`\`\`asciidoc\nCPU :: ${server.cpu.cores}x ${server.cpu.model}${server.cpu.speed}\nMemory :: ${server.memory.used}/${server.memory.total}MB (${server.memory.usage}%)\n\`\`\``,
                },
            ]),

    /**
     * 
     * @param {string} attachmentName Attachment name
     * @param {string} platform Platform name
     * @param {string} target Target name
     * @returns {object} Discord Embed object
     */
    COZY: (attachmentName, platform, target) =>
        new EmbedBuilder()
            .setColor(client.accentColor)
            .setTitle('Cozy')
            .setDescription(`You're looking cozy today! ${Emoji.KittyComfy}`)
            .addFields(
                { name: 'Platform', value: platform, inline: true },
                { name: 'Target', value: target, inline: true },
            )
            .setImage(`attachment://${attachmentName}`),
};