const axios = require('axios').default;
const { Url } = require('./constants');

module.exports = {
    pronounDb: (platform, id) => new Promise((resolve, reject) => {
        axios.get(`${Url.PronounDB}?platform=${platform}&id=${id}`)
            .then(({ data }) => resolve(data.pronouns))
            .catch(error => reject(error));
    }),
};