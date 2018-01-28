#!/usr/bin/env node

const program = require('commander');
const run = require('./run');
const fs = require('fs');
const path = require('path');

program
    .version(process.env.npm_package_version)

    .option('-d, --directory [path]', 'Path to working directory')

    .option('-o, --output [path]', 'Output list of files in file')

    .option('-i, --include [mask]', 'Mask of files for search cyrillic')

    .option('-e, --exclude [mask]', 
        'Mask for excluding files on search cyrillic [maskExcluding]')

    .parse(process.argv);

    run(program.include, program.exclude, program.directory)
        .then((files) => {
            // console.log('Unlocalized files (contain cyrillic):')
            // console.log();
            files.forEach((file) => {
                console.log(file);
            });

            if (program.output) {
                fs.writeFileSync(program.output, files.join('\r\n'), {
                    encoding: 'utf8',
                    flag: 'w'
                });
            }
        });