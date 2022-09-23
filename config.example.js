const { ActivityType } = require('discord.js');
const { StatusType } = require('./assets/constants');

module.exports = {
    DeveloperId: `DEVELOPER_ID`,
    TestGuildId: `TEST_GUILD_ID`,
    Prefix: `!`,
    
    Presence: {
        Status: StatusType.Online,
        Type: ActivityType.Playing,
        Name: 'Activity Name',
    },
    
    BaseUrl: {
        Base: 'BASE_URL',
        BotInvite: `/invite`,
    },
    RepositoryUrl: `REPOSITORY_URL`,

    SupportServer: {
        Id: 'ID',
        Invite: 'DISCORD_LINK',
        Channels: {
            ErrorReports: `ERROR_REPORTS`,
        },
    },

    ApiServer: {
        Port: '3000',
        Token: '',
    },
    
    AccentColor: `#ffffff`,

    DiscordToken: `DISCORD_TOKEN`,
    TopGGToken: `TOPGG_TOKEN`,
}