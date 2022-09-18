const { AutocompleteInteraction, CommandInteraction, Message, ActionRowBuilder } = require('discord.js');
const { InteractionType, CommandType } = require('../../assets/enums.js');
const { PING, PING_BUTTON } = require('../../assets/messages.js');
const { sendMessage } = require('../../utils/command.js'); 

module.exports = {
    type: InteractionType.APPLICATION_COMMAND,
    data: {
        type: CommandType.CHAT_INPUT,
        name: 'ping',
        description: 'Pong!',
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
        return await this.run(interaction);
    },
    
    /**
     * @param {Message} message 
     */
    async runMessage(message) {
        return await this.run(message);
    },

    /**
     * @param {CommandInteraction | Message} source 
     * @returns {Promise}
     */
	async run(source) {
        const message = PING;
        const row = new ActionRowBuilder().addComponents(PING_BUTTON);

		return sendMessage(source, { content: message, components: [row] });
	}
};