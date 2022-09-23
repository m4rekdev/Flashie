const { CommandInteraction, ActionRowBuilder } = require('discord.js');
const { InteractionType } = require('../assets/constants.js');
const { GUILD_ONLY } = require('../assets/messages.js');
const reportError = require('../utils/errorReporting.js');
const { log } = require('../utils/logger.js');
const { sendMessage } = require('../utils/command.js');

module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction
     */
    async run(interaction) {
        if (!interaction.isCommand()) return;

        const { client, user, commandName, guildId } = interaction;
        if (user.bot) return;

        const command = client.interactions[InteractionType.ApplicationCommand].find(command => command.data.name == commandName);
        if (!command) return;

        try {
            log('User Action', `'${user.tag}' (${user.id}) executed command '${commandName}'`, 'magenta');

            if (command.guildOnly && !guildId) return sendMessage(interaction, { embeds: [GUILD_ONLY] });

            return await command.slashcommand(interaction);
        } catch (error) {
            const { embed, button } = await reportError(user, error, { type: 'Interaction Command', name: commandName });
            const row = new ActionRowBuilder().addComponents(button);
            
            return sendMessage(interaction, { embeds: [embed], components: [row] });
        }
    },
};
