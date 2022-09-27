const axios = require('axios');
const { User } = require('discord.js');
const { fetchUser, fetchUserFromUsername } = require('./command');

module.exports = {
    /**
     * @param {User} user 
     * @returns {object | Error}
     */
    discord: (user) => new Promise((resolve, reject) => {
        if (typeof user === "string") {
            if (user.startsWith('<@') && user.endsWith('>')) user = fetchUser(user)
                .then((user) =>  resolve({ name: user.username, avatar: user.displayAvatarURL({ extension: 'png', size: 256 }), id: user.id }))
                .catch((error) => reject({ message: 'INVALID_USER' }));
            else user = fetchUserFromUsername(user)
                .then((user) =>  resolve({ name: user.username, avatar: user.displayAvatarURL({ extension: 'png', size: 256 }), id: user.id }))
                .catch((error) => reject({ message: 'INVALID_USER' }));

            
        } else if (!(user instanceof User)) reject({ message: 'INVALID_USER' });
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

                resolve({ name, avatar: `https://minotar.net/helm/${name}/256` });
            });
    }),
}