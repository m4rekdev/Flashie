const path = require('path');
const { readdirSync, statSync } = require('fs');

module.exports = {
    walk: (directory) => {
        const results = [];

        readdirSync(directory).forEach(directoryItem => {
            const stat = statSync(path.join(directory, directoryItem));
    
            if (stat.isFile()) return results.push(path.join(directory, directoryItem));
            if (stat.isDirectory()) walk(path.join(directory, directoryItem)).forEach(walkItem => results.push(walkItem));
        });
    
        return results;
    },
};