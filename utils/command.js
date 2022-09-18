const { Message, CommandInteraction, ButtonInteraction } = require('discord.js');

/**
 * @returns {boolean}
 */
const isMessage = (source) => source instanceof Message;

/**
 * @returns {boolean}
 */
const isInteraction = (source) => 
    source instanceof CommandInteraction
    || source instanceof ButtonInteraction;

module.exports = {
    /**
     * @param {CommandInteraction | ButtonInteraction | Message} source 
     * @param {object} response 
     * @param {object} options 
     * @returns {Promise<Message | undefined>}
     */
    sendMessage: (source, response, options = { edit: true, reply: false, fetch: true }) => new Promise((resolve, reject) => {
        if (options.fetch) response.fetchReply = true;

        if (isMessage(source)) 
            return resolve(
                options.edit && source.editable 
                ? source.edit(response) 
                : (options.reply ? source.reply(response) : source.channel.send(response))
            );
        
        if (isInteraction(source)) 
            return resolve(
                options.reply || !source.replied
                ? source.reply(response)
                : (options.edit ? source.editReply(response) : source.followUp(response)) 
            );

        return reject(Error('Provided source is not supported!'));
    }),
};