const { Message, ActionRowBuilder } = require('discord.js');
const { InteractionType } = require('../assets/constants.js');
const { SLASHCOMMAND_WARNING } = require('../assets/messages.js');
const { Prefix } = require('../config.js');
const { sendMessage } = require('../utils/command.js');
const reportError = require('../utils/errorReporting.js');

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Message} message 
     */
    async run(message) {
        const { client, author: user, content } = message;

        if (user.bot) return;
        
        const prefixRegex = new RegExp(`^(${Prefix}|<@!?${client.user.id}>)`);
        if (!content.match(prefixRegex)) return;
        
        const arguments = content.replace(prefixRegex, '').trim().split(/ +/g);
        const commandName = arguments.shift().toLowerCase();

        const command = client.interactions[InteractionType.ApplicationCommand].find(command => command.data.name == commandName);
        if (!command) return;

        try {
            return await sendMessage(message, { embeds: [SLASHCOMMAND_WARNING(commandName)] });
        } catch (error) {
            const { embed, button } = await reportError(user, error, { type: 'Message Command', name: commandName });
            const row = new ActionRowBuilder().addComponents(button);
            
            return sendMessage(message, { embeds: [embed], components: [row] });
       }
    },
};
