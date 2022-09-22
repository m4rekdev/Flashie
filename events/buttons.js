const { ActionRowBuilder } = require('discord.js');
const { InteractionType } = require('../assets/constants.js');
const { sendMessage } = require('../utils/command.js');
const reportError = require('../utils/errorReporting.js');
const { log } = require('../utils/logger.js');

module.exports = {
    name: 'interactionCreate',
    
    async run(interaction) {
        if (!interaction.isButton()) return;

        const { client, user, customId } = interaction;
        if (user.bot) return;

        const button = client.interactions[InteractionType.Button].find(button => button.data.id == customId);
        if (!button) return;

        try {
            log('User Action', `'${user.tag}' (${user.id}) used button '${customId}'`, 'magenta');

            return await button.run(interaction);
        } catch (error) {
            const { embed, button } = await reportError(user, error, { type: 'Interaction Command', name: customId });
            const row = new ActionRowBuilder().addComponents(button);
            
            return sendMessage(interaction, { embeds: [embed], components: [row] });
		}
    },
};