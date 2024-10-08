const { EmbedBuilder, ButtonBuilder, ButtonStyle, User, Guild } = require('discord.js');
const { Emoji, Categories, Platform } = require('./constants.js');
const { BaseUrl, RepositoryUrl, AccentColor } = require('../config.js');
const platforms = require('../utils/platforms.js');

module.exports = {
    GUILD_ONLY: new EmbedBuilder()
        .setColor(AccentColor)
        .setTitle('Sorry, but this command can only be used in servers.'),
    
    NO_RESULTS:
        new EmbedBuilder()
            .setColor(AccentColor)
            .setTitle('Error')
            .setDescription('Couldn\'t find any matches to your search!'),
    /**
     * @returns {EmbedBuilder} Discord Embed object
     */
    INVALID_PLATFORM: () => {
        const platformsList = Object.values(Platform).join(' | ');

        return new EmbedBuilder()
                    .setColor(AccentColor)
                    .setTitle('Error')
                    .setDescription(`Invalid platform!\n\`Platforms\` ${platformsList}`)
    },

    NO_TARGET:
        new EmbedBuilder()
            .setColor(AccentColor)
            .setTitle('Error')
            .setDescription('You need to specify the target (username or mention)!'),

    SLASHCOMMAND_WARNING: (commandName) =>
        new EmbedBuilder()
            .setColor(AccentColor)
            .setTitle('You need to use this command as a slash command!')
            .setDescription(`You can only execute this command using **Slash Commands**. Please use \`/${commandName}\` instead to execute this command. Non-Slash commands will be disappearing as of **October 2022**.\n
            It is important to note that **all bots** will be **required** to use Slash Commands by **October 2022**.\n
            Using [this link](${BaseUrl.Base}${BaseUrl.BotInvite}) can help you get the bot invited again if the server you are on doesn't show **Flashie's slash commands**. The bot **doesn't need to be kicked**, it just needs to be **invited again**!`),

    /**
     * 
     * @param {number} errorId The Error ID
     * @returns {EmbedBuilder} Discord Embed object
     */
    ERROR_USER: (errorId) => ({
        embed: new EmbedBuilder()
            .setColor(AccentColor)
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
            .setURL(`${RepositoryUrl}/issues/new?template=bug_report.md`)
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
            .setColor(AccentColor)
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

    STATS_RECORDING: 'Initializing stats, please wait.',

    /**
     * 
     * @param {object} bot Object with bot details
     * @param {object} latency Object with latency details
     * @param {object} server Object with server details
     * @returns {object} Discord Embed object
     */
    STATS: (bot = { discordJsVersion, uptime }, latency = { total, discord, websocket }, server = { cpu: { cores, model, speed }, memory: { total, usage }}) =>
        new EmbedBuilder()
            .setColor(AccentColor)
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
            .setColor(AccentColor)
            .setTitle('Cozy')
            .setDescription(`${Emoji.ComfyPepe} Look, so cozy!`)
            .addFields(
                { name: 'Platform', value: platform, inline: true },
                { name: 'Target', value: target, inline: true },
            )
            .setImage(`attachment://${attachmentName}`),

    /**
     * 
     * @param {string} attachmentName Attachment name
     * @param {string} platform Platform name
     * @param {string} target Target name
     * @returns {object} Discord Embed object
     */
    SHIP: (attachmentName, platform, target) =>
        new EmbedBuilder()
            .setColor(AccentColor)
            .setTitle('Ship')
            .setDescription(`${Emoji.LovelyCat} Lovely!`)
            .addFields(
                { name: 'Platform', value: platform, inline: true },
                { name: 'Target', value: target, inline: true },
            )
            .setImage(`attachment://${attachmentName}`),

    SHIP_YOURSELF: 
        new EmbedBuilder()
            .setColor(AccentColor)
            .setTitle('Ship')
            .setDescription(`You can't ship yourself, silly!`),

    /**
     * 
     * @param {object} commands Object of commands divided into categories
     * @returns {object} Discord Embed object
     */
    HELP: (commands) =>
        new EmbedBuilder()
            .setColor(AccentColor)
            .setTitle('Help')
            .addFields(Object.entries(commands).map(([ category, commands ]) => ({ name: Categories[category], value: commands.map(command => `\`${command}\``).join(', ') }))),

    /**
     * 
     * @param {string} pronouns
     * @param {User} user
     * @returns {object} Discord Embed object
     */
    PRONOUNS: (pronouns, user) =>
        new EmbedBuilder()
            .setColor(AccentColor)
            .setTitle('Pronouns')
            .setThumbnail(user.avatar)
            .setDescription(`**${user.name}'s** pronouns are \`${pronouns}\``)
            .setFooter({
                text: 'Using pronoundb.org',
            }),
    
    /**
     * 
     * @param {User} user
     * @returns {object} Discord Embed object
     */
    AVATAR: (user) =>
        new EmbedBuilder()
            .setColor(AccentColor)
            .setAuthor({
                name: user.tag,
                iconURL: user.displayAvatarURL(),
            })
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            .setDescription([
                [
                    '`Formats`',
                    `[png](${user.displayAvatarURL({ size: 2048, format: 'png' })})`,
					`[jpg](${user.displayAvatarURL({ size: 2048, format: 'jpg' })})`,
					`[webp](${user.displayAvatarURL({ size: 2048, format: 'webp' })})`
				].join(' | '),
				[
                    '`Sizes`',
					`[16](${user.displayAvatarURL({ size: 16, dynamic: true })})`,
					`[32](${user.displayAvatarURL({ size: 32, dynamic: true })})`,
					`[64](${user.displayAvatarURL({ size: 64, dynamic: true })})`,
					`[128](${user.displayAvatarURL({ size: 128, dynamic: true })})`,
					`[256](${user.displayAvatarURL({ size: 256, dynamic: true })})`,
					`[512](${user.displayAvatarURL({ size: 512, dynamic: true })})`,
					`[1024](${user.displayAvatarURL({ size: 1024, dynamic: true })})`,
					`[2048](${user.displayAvatarURL({ size: 2048, dynamic: true })})`
				].join(' | ')
			].join('\n')),

    /**
     * 
     * @param {Guild} guild
     * @returns {object} Discord Embed object
     */
    GUILDICON: (guild) =>
        new EmbedBuilder()
            .setColor(AccentColor)
            .setAuthor({
                name: guild.name,
                iconURL: guild.iconURL(),
            })
            .setImage(guild.iconURL({ size: 2048, dynamic: true }))
            .setDescription([
                [
                    '`Formats`',
                    `[png](${guild.iconURL({ size: 2048, format: 'png' })})`,
					`[jpg](${guild.iconURL({ size: 2048, format: 'jpg' })})`,
					`[webp](${guild.iconURL({ size: 2048, format: 'webp' })})`
				].join(' | '),
				[
                    '`Sizes`',
					`[16](${guild.iconURL({ size: 16, dynamic: true })})`,
					`[32](${guild.iconURL({ size: 32, dynamic: true })})`,
					`[64](${guild.iconURL({ size: 64, dynamic: true })})`,
					`[128](${guild.iconURL({ size: 128, dynamic: true })})`,
					`[256](${guild.iconURL({ size: 256, dynamic: true })})`,
					`[512](${guild.iconURL({ size: 512, dynamic: true })})`,
					`[1024](${guild.iconURL({ size: 1024, dynamic: true })})`,
					`[2048](${guild.iconURL({ size: 2048, dynamic: true })})`
				].join(' | ')
			].join('\n')),
};