const axios = require('axios');
const { User } = require('discord.js');

module.exports = {
    /**
     * @param {User} user 
     * @returns {object | Error}
     */
    discord: (user) => new Promise((resolve, reject) => {
        if (!(user instanceof User)) reject({ message: 'INVALID_USER' });

        resolve({ name: user.username, avatar: user.displayAvatarURL({ extension: 'png', size: 256 }) });
    }),

    /**
     * 
     * @param {string} username 
     * @returns {object | Error}
     */
    minecraft: (username) => new Promise((resolve, reject) => {
        if (!username) reject({ message: 'INVALID_USER' });

        axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
            .then(({ data }) => data?.name)
            .then(name => {
                if (!name) reject({ message: 'INVALID_USER' });

                resolve({ name, avatar: `https://minotar.net/helm/${name}/256`});
            });
    }),
}