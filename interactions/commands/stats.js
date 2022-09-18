const { AutocompleteInteraction, CommandInteraction, Message } = require('discord.js');
const ms = require('ms');
const { InteractionType, CommandType } = require('../../assets/enums.js');
const { STATS } = require('../../assets/messages.js');
const { sendMessage } = require('../../utils/command.js');

module.exports = {
    type: InteractionType.APPLICATION_COMMAND,
    data: {
        type: CommandType.CHAT_INPUT,
        name: `stats`,
        description: `Shows the bot's stats.`,
        options: [],
    },

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
     * @param {Message} message 
     */
    async runMessage(message) {
        const { client } = message;

        return await this.run(message, client);
    },

    /**
     * @param {CommandInteraction | Message} ; 
     * @param {Client} client 
     * @returns {Promise}
     */
	async run(source, client) {
        const botMessage = await sendMessage(source, { content: `Ping?` });

        const uptime = ms(client.uptime);
        const wsPing = Math.round(client.ws.ping);
        const cfPing = 2;
		const roundTrip = (botMessage.editedTimestamp || botMessage.createdTimestamp) - (source.editedTimestamp || source.createdTimestamp);
        
		const discordLatency = roundTrip - wsPing > 0 ? roundTrip - wsPing - cfPing : roundTrip - cfPing;
		const wsLatency = wsPing - cfPing;
		const totalLatency = discordLatency + wsLatency;

        const embed = await STATS(totalLatency, discordLatency, wsLatency, uptime);
		return sendMessage(botMessage, { embeds: [embed] });
	}
};