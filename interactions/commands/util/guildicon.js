const { AutocompleteInteraction, CommandInteraction } = require('discord.js');
const { InteractionType, CommandType, Categories } = require('../../../assets/constants.js');
const { GUILDICON } = require('../../../assets/messages.js');
const { sendMessage } = require('../../../utils/command.js');

module.exports = {
    type: InteractionType.ApplicationCommand,
    data: {
        type: CommandType.ChatInput,
        name: 'guildicon',
        description: 'Displays the server\'s icon.',
        options: [],
    },

    category: Categories.Util,
    guildOnly: true,

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
    async slashcommand(interaction) {
        const { guild } = interaction;

        const embed = GUILDICON(guild);
		return sendMessage(interaction, { embeds: [embed] });
    },
};