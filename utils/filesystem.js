const path = require('path');
const { readdirSync, statSync } = require('fs');

const walk = (dir) => {
    const results = [];

    readdirSync(dir).forEach(dirItem => {
        const stat = statSync(path.join(dir, dirItem));

        if (stat.isFile()) return results.push(path.join(dir, dirItem));
        if (stat.isDirectory()) walk(path.join(dir, dirItem)).forEach(walkItem => results.push(walkItem));
    });

    return results;
};

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