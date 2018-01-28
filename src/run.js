const readdir = require('recursive-readdir');
const path = require('path');
const fs = require('fs');

module.exports = (program, workingDir) => {
    const ignoreFunc = (file, stats) => {
        const regexpCyrillic = /[А-Яа-яЁё]/;
        
        if (program.exclude) {
            const regexpExcluding = new RegExp(program.exclude);
            const isExcluding = regexpExcluding.test(file);

            if (isExcluding) { 
                return true;
            }
        }

        if (program.include && stats.isFile()) {
            const regexpIncluding = new RegExp(program.include);
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

    return readdir('./', [ignoreFunc]);
}