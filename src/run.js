const readdir = require('recursive-readdir');
const path = require('path');
const fs = require('fs');

module.exports = (include, exclude, directory = '.') => {
    const workingDirectory = path.join('.', directory);

    const ignoreFunc = (file, stats) => {
        const regexpCyrillic = /[А-Яа-яЁё]/;

        if (exclude) {
            const regexpExcluding = new RegExp(exclude);
            const isExcluding = regexpExcluding.test(file);

            if (isExcluding) { 
                return true;
            }
        }

        if (include && stats.isFile()) {
            const regexpIncluding = new RegExp(include);
            const isIncluding = regexpIncluding.test(file);

            if (!isIncluding) {
                return true;
            }
        }

        if (stats.isFile()) {
            const content = fs.readFileSync(file, 'utf8');
            const isCyrillic = regexpCyrillic.test(content);

            return isCyrillic;
        }

        return false;
    };

    return readdir(workingDirectory, [ignoreFunc]);
}