const readdir = require('recursive-readdir');
const path = require('path');
const fs = require('fs');

module.exports = (include, exclude, directory = '.') => {
    const workingDirectory = path.join('.', directory);

    const ignoreFunc = (file, stats) => {
        const regexpCyrillic = /[А-Яа-яЁё]/;
        const regexpCommentsJS = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm;
        const regexpCommentsHtml = /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*|<!--[\s\S]*?-->$/gm;

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
            let clearedContent = '';

            if (['.html', '.htm'].indexOf(path.extname(file)) !== -1) {
                clearedContent = content.replace(regexpCommentsHtml, '');
            }

            if (['.js', '.ts'].indexOf(path.extname(file)) !== -1) {
                clearedContent = content.replace(regexpCommentsJS, '$1');
            }

            const isCyrillic = regexpCyrillic.test(clearedContent);

            return !isCyrillic;
        }

        return false;
    };

    return readdir(workingDirectory, [ignoreFunc]);
}