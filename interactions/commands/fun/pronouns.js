const { AutocompleteInteraction, CommandInteraction, User } = require('discord.js');
const { InteractionType, CommandType, Categories, OptionType, Pronouns } = require('../../../assets/constants.js');
const { PRONOUNS } = require('../../../assets/messages.js');
const { pronounDb } = require('../../../assets/utils.js');
const { sendMessage } = require('../../../utils/command.js');

module.exports = {
    type: InteractionType.ApplicationCommand,
    data: {
        type: CommandType.ChatInput,
        name: `pronouns`,
        description: `Check other users pronouns.`,
        options: [
            {
                type: OptionType.User,
                name: `user`,
                description: `User to search pronouns of.`,
                required: true,
            },
        ],
    },

    category: Categories.Fun,

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

        const pronouns = await pronounDb('discord', user.id)
            .then(pronouns => Pronouns[pronouns])
            .catch(() => Pronouns.unspecified);

        const embed = PRONOUNS(pronouns, { name: user.username, avatar: user.displayAvatarURL() });
		return sendMessage(interaction, { embeds: [embed] });
    },
};