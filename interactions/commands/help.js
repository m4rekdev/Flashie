const { AutocompleteInteraction, CommandInteraction } = require('discord.js');
const { InteractionType, CommandType, Categories } = require('../../assets/constants.js');
const { HELP } = require('../../assets/messages.js');
const { sendMessage } = require('../../utils/command.js');

module.exports = {
    type: InteractionType.ApplicationCommand,
    data: {
        type: CommandType.ChatInput,
        name: `help`,
        description: `Display help for a command.`,
        options: [],
    },

    category: Categories.Util,

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
        const commands = client.interactions[InteractionType.ApplicationCommand].filter(commands => commands.data.type === CommandType.ChatInput);
        const categories = commands.reduce((array, { data, category }) => {
            (array[category] ??= []).push(data.name);
            return array;
        }, {});

        const embed = HELP(categories);
		return sendMessage(source, { embeds: [embed] });
	}
};