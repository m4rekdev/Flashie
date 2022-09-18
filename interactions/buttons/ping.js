const { ButtonInteraction } = require('discord.js');
const { PING } = require('../../assets/messages.js');
const { InteractionType } = require('../../assets/enums.js');
const { sendMessage } = require('../../utils/command.js');

module.exports = {
    type: InteractionType.BUTTON,
    data: {
        id: 'ping',
    },

    /**
     * @param {ButtonInteraction} interaction 
     */
	async run(interaction) {
        const message = PING;
		return sendMessage(interaction, { content: message });
	}
};