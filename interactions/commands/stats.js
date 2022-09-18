const { AutocompleteInteraction, CommandInteraction, Message, ActionRowBuilder, User } = require('discord.js');
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
        return await this.run(interaction, interaction.user);
    },
    
    /**
     * @param {Message} message 
     */
    async runMessage(message) {
        return await this.run(message, message.author);
    },

    /**
     * @param {CommandInteraction | Message} source 
     * @param {User} user 
     * @returns {Promise}
     */
	async run(source, user) {
        const embed = await STATS(user.tag, user.avatarURL(), source.createdTimestamp);

		return sendMessage(source, { embeds: [embed] });
	}
};