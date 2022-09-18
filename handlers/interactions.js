const { Collection } = require('discord.js');
const path = require('path');
const { walk } = require('../utils/filesystem.js');

module.exports = (client) => {
    const interactions = walk(path.join(__dirname, '../interactions')).filter(file => file.endsWith('.js'));

    for (const file of interactions) {
        const interaction = require(file);

        const { type, name, id } = interaction;
        if (!type) return;

        const identifier = name || id;
        (client.interactions[type] ??= new Collection()).set(identifier, interaction);
    }
};