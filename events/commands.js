const { Message, ActionRowBuilder } = require('discord.js');
const { InteractionType } = require('../assets/enums.js');
const { GUILD_ONLY } = require('../assets/messages.js');
const { sendMessage } = require('../utils/command.js');
const reportError = require('../utils/errorReporting.js');
const { log } = require('../utils/logger.js');

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Message} message 
     */
    async run(message) {
        const { client, author: user, content } = message;

        if (user.bot) return;
        
        const prefixRegex = new RegExp(`^(${client.prefix}|<@!?${client.user.id}>)`);
        const prefix = content.match(prefixRegex);
        if (!prefix) return;
        
        const arguments = content.replace(prefixRegex, '').trim().split(/ +/g);
        const commandName = arguments.shift().toLowerCase() || 'help';
        
        const command = client.interactions[InteractionType.ApplicationCommand].find(command => command.data.name == commandName);
        if (!command) return;

        try {
            log('User Action', `'${user.tag}' (${user.id}) executed command '${commandName}'`, 'magenta');

            if (command.guildOnly && !guildID) return sendMessage(message, { embeds: [GUILD_ONLY] });

            return await command.runMessage(message, arguments);
        } catch (error) {
            const { embed, button } = await reportError(user, error, { type: 'Message Command', name: commandName });
            const row = new ActionRowBuilder().addComponents(button);
            
            return sendMessage(message, { embeds: [embed], components: [row] });
       }
    },
};
