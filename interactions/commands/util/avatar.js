const { AutocompleteInteraction, CommandInteraction, Message } = require('discord.js');
const { InteractionType, CommandType, Categories, OptionType } = require('../../../assets/constants.js');
const { AVATAR, INVALID_PLATFORM, NO_RESULTS } = require('../../../assets/messages.js');
const { sendMessage, fetchUser, fetchUserFromUsername } = require('../../../utils/command.js');

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
     async runInteraction(interaction) {
        await interaction.deferReply();
        const user = interaction.options.getUser('user');

        return await this.run(interaction, user);
    },
    
    /**
     * @param {Message} message 
     * @param {array} arguments 
     */
    async runMessage(message, arguments) {
        const [ usernameOrMention ] = arguments;
        const embed = NO_RESULTS;

        if (!usernameOrMention) sendMessage(message, { embeds: [NO_TARGET] })

        let user;

        if (usernameOrMention.startsWith('<@') && usernameOrMention.endsWith('>')) user = fetchUser(usernameOrMention)
            .then((u) => u)
            .catch((error) => { return sendMessage(message, { embeds: [embed] }) });
        else user = fetchUserFromUsername(usernameOrMention)
            .then((u) => u)
            .catch((error) => { return sendMessage(message, { embeds: [embed] }) });
    
        return await this.run(message, user);
    },

    /**
     * @param {CommandInteraction | Message} source 
     */
    async run(source, user) {
        const embed = AVATAR(user);
		return sendMessage(source, { embeds: [embed] });
    },
};