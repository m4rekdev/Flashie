const { AutocompleteInteraction, CommandInteraction } = require('discord.js');
const { InteractionType, CommandType, Categories, OptionType } = require('../../../assets/constants.js');
const { AVATAR } = require('../../../assets/messages.js');
const { sendMessage } = require('../../../utils/command.js');

module.exports = {
    type: InteractionType.ApplicationCommand,
    data: {
        type: CommandType.ChatInput,
        name: `avatar`,
        description: `Get the avatar from a user.`,
        options: [
            {
                type: OptionType.User,
                name: `user`,
                description: `User to get avatar of.`,
                required: true,
            },
        ],
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
    async slashcommand(interaction) {
        const user = interaction.options.getUser('user');

        const embed = AVATAR(user);
		return sendMessage(interaction, { embeds: [embed] });
    },
};