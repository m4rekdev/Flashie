const { AutocompleteInteraction, CommandInteraction, version: discordJsVersion, Client } = require('discord.js');
const { totalmem, cpus, freemem } = require('os');
const ms = require('ms');
const { InteractionType, CommandType, Categories } = require('../../assets/constants.js');
const { STATS, STATS_RECORDING } = require('../../assets/messages.js');
const { sendMessage } = require('../../utils/command.js');

module.exports = {
    type: InteractionType.ApplicationCommand,
    data: {
        type: CommandType.ChatInput,
        name: `stats`,
        description: `Responds with the bot's statistics.`,
        options: [],
    },

    category: Categories.General,

    /**
     * @param {AutocompleteInteraction} interaction 
     */
    async autocomplete(interaction) {
        const choices = [];
        return choices;
    },

    /**
     * @param {CommandInteraction} interaction 
     */
    async runInteraction(interaction) {
        const { client } = interaction;

        return await this.run(interaction, client);
    },
    
    /** 
     * @param {CommandInteraction | Message} ; 
     * @param {Client} client 
     * @returns {Promise}
     */
	async run(source, client) {
        const botMessage = await sendMessage(source, { content: STATS_RECORDING });

        //* Bot statistics
        const botStatistics = {
            uptime: ms(client.uptime, { long: true }),
            discordJsVersion,
            guilds: client.guilds.cache.size,
            users: client.guilds.cache.reduce((accumulator, { members }) => accumulator + members.cache.size, 0),
        };
        
        //* Latency details
        const wsPing = Math.round(client.ws.ping);
        const cfPing = 2;
		const roundTrip = (botMessage.editedTimestamp || botMessage.createdTimestamp) - (source.editedTimestamp || source.createdTimestamp);
        const latencyDetails = {
            discord: roundTrip - wsPing > 0 ? roundTrip - wsPing - cfPing : roundTrip - cfPing,
            websocket: wsPing - cfPing,
        };

        //* Server details
        const serverStatistics = {
            cpu: {
                cores: cpus().length,
                model: cpus()[0].model.trim(),
                speed: cpus()[0].model.includes('@') ? '' : ` @ ${(cpus()[0].speed / 1000).toFixed(2)}GHz`,
            },
            memory: {
                used: ((totalmem() - freemem()) / 1024 / 1024).toFixed(0),
                total: (totalmem() / 1024 / 1024).toFixed(0),
                usage: ((totalmem() - freemem()) / totalmem() * 100).toFixed(0),
            },
        };

        const embed = await STATS(botStatistics, latencyDetails, serverStatistics);
		return sendMessage(botMessage, { content: '', embeds: [embed] });
	}
};