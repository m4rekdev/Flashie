module.exports = {
    InteractionType: {
        ApplicationCommand: 1,
        Button: 2,
    },
    CommandType: {
        ChatInput: 1,
        User: 2,
        Message: 3,
    },
    OptionType: {
        Subcommand: 1,
        SubcommandGroup: 2,
        String: 3,
        Integer: 4,
        Boolean: 5,
        User: 6,
        Channel: 7,
        Role: 8,
        Mentionable: 9,
        Number: 10,
        Attachment: 11,
    },
    Platforms: {
        discord: 'Discord',
        minecraft: 'Minecraft',
    },
    Emoji: {
        KittyComfy: '<:kittycomfy:1021101256284065863>',
    },
    Categories: {
        General: 'General',
        Fun: 'Fun',
    },
    Pronouns: {
        hh: 'he/him',
        hi: 'he/it',
        hs: 'he/she',
        ht: 'he/they',
        ih: 'it/him',
        ii: 'it/its',
        is: 'it/she',
        it: 'it/they',
        shh: 'she/he',
        sh: 'she/her',
        si: 'she/it',
        st: 'she/they',
        th: 'they/he',
        ti: 'they/it',
        ts: 'they/she',
        tt: 'they/them',
        any: 'any pronouns',
        other: 'other pronouns',
        ask: 'ask for pronouns',
        avoid: 'avoid pronouns, use name',
        unspecified: 'Unspecified'
    },
    Url: {
        PronounDB: 'https://pronoundb.org/api/v1/lookup',
    },
};