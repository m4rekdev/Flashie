const { Router } = require('express');
const router = new Router();
const client = require('../../app.js');
const authentication = require('../middleware/authentication.js');

router.get('/goodbyepavlyi', authentication, async (req, res) => {
    const data = {
        userId: '755473025209466950',
        guildId: '888438384836612107',
    };

    const user = await client.users.fetch(data.userId, { force: true });
    const member = await (await client.guilds.fetch(data.guildId))?.members.fetch(data.userId);

    if (!member?.user?.id || !user?.id) return res.status(500).json({
        status: 500,
        message: 'Cannot fetch goodbyepavlyi.',
    });

    switch (member.presence?.status) {
        default: { color = '#747F8D'; break; }
        case 'online': { color = '#57F287'; break; }
        case 'dnd': { color = '#ED4245'; break; }
        case 'idle': { color = '#FEE75C'; break; }
    };

    const customstatus = member.presence.activities.find(activity => activity.type == 4);

    const presence = {
        status: {
            text: member.status,
            color,
        },
        text: customstatus.state,
        emote: customstatus?.emoji ? customstatus?.emoji?.name || `https://cdn.discordapp.com/emojis/${customstatus?.emoji?.id}.${customstatus?.emoji?.animated ? 'gif' : 'png'}?size=2048` : undefined,
    }

    const activities = [];
    member.presence.activities.forEach(activity => {
        const { name, type, url, createdTimestamp, timestamps, applicationId, details, state, assets } = activity;
        if (type == 4) return;

        activities.push({
            applicationId,
            name,
            url,
            details,
            state,
            createdTimestamp,
            timestamps,
            assets,
        });
    });

    return res.status(200).json({
        status: 200,
        message: 'OK',
        content: {
            id: member.user.id,
            username: member.user.username,
            discriminator: member.user.discriminator,
            nickname: member.nick || member.user.username,
            avatar: member.user.avatar ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.${member.user.avatar?.startsWith('a_') ? 'gif' : 'png'}?size=2048` : null,
            nickavatar: member.avatar ? `https://cdn.discordapp.com/guilds/${member.guild.id}/users/${member.id}/avatars/${member.avatar}.${member.avatar?.startsWith('a_') ? 'gif' : 'png'}?size=2048` : null,
            banner: user.banner ? `https://cdn.discordapp.com/banners/${member.user.id}/${user.banner}.${user.banner.startsWith('a_') ? 'gif' : 'png'}?size=600` : null,
            publicFlags: user.publicFlags,
            accentColor: user.accentColor,
            hexAccentColor: user.hexAccentColor || user.accentColor,
            createdTimestamp: user.createdTimestamp,
            presence,
            activities,
        }
    });
});

module.exports = router;