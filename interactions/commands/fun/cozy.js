const { AutocompleteInteraction, CommandInteraction, Message, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');
const { InteractionType, CommandType, OptionType, Platform, Categories } = require('../../../assets/constants.js');
const { sendMessage } = require('../../../utils/command.js');
const { roundImage } = require('../../../utils/imagetransformation.js');
const platforms = require('../../../utils/platforms.js');
const { COZY, NO_RESULTS } = require('../../../assets/messages.js');

module.exports = {
    type: InteractionType.ApplicationCommand,
    data: {
        type: CommandType.ChatInput,
        name: `cozy`,
        description: `Generate a cozy avatar from Minecraft and Discord (current server only).`,
        options: [
            {
                type: OptionType.Subcommand,
                name: `minecraft`,
                description: `Generate a cozy avatar from a Minecraft player's head.`,
                options: [
                    {
                        type: OptionType.String,
                        name: `player_name`,
                        description: `The player name to search for.`,
                        required: true
                    }
                ]
            },
            {
                type: OptionType.Subcommand,
                name: `discord`,
                description: `Generate a cozy avatar from a Discord user's avatar (current server only).`,
                options: [
                    {
                        type: OptionType.User,
                        name: `user`,
                        description: `The Discord user.`,
                        required: true
                    }
                ]
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
        const platform = interaction.options.getSubcommand();
        const target = interaction.options.getString('player_name') ?? interaction.options.getUser('user');

        await interaction.deferReply();

        await platforms[platform](target).then(async ({ name, avatar: fetchedAvatar }) => {
            const canvas = Canvas.createCanvas(256, 256);
            const context = canvas.getContext('2d');

            const overlay = await Canvas.loadImage('assets/images/cozy.png');
            const avatar = await Canvas.loadImage(fetchedAvatar);
            context.save();

            roundImage(context, 90, 20, 134, 134, 90);
            context.clip();
            context.drawImage(avatar, 100, 18, 134, 134);
            context.restore();
            context.drawImage(overlay, 0, 0, canvas.width, canvas.height);

            const attachmentName = 'cozy.png';
            const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: attachmentName });
            const embed = COZY(attachmentName, Platform[platform], name);

            return sendMessage(interaction, { embeds: [embed], files: [attachment] });
        }).catch(error => new Promise((resolve, reject) => {
            switch (error.message) {                
                default:
                    return reject(error);
                    
                case 'INVALID_USER':
                    response = { embeds: [NO_RESULTS] };
                    break;
            }

            resolve(sendMessage(interaction, response));
        }));
    },
};
