#!/usr/bin/env node

const program = require('commander');
const run = require('./run');

program
    .version(process.env.npm_package_version)
    .usage('[options] <workingDir>')

    .option('-o, --output', 'Output list of files in file')

    .option('-i, --include [maskIncluding...]', 'Mask of files for search cyrillic')

    .option('-e, --exclude [maskExcluding...]', 
        'Mask for excluding files on search cyrillic [maskExcluding]')

    .action((workingDir) => {
        run(program, workingDir)
            .then((files) => {
                console.log('Unlocalized files (contain cyrillic):')
                console.log('');
                files.forEach((file) => {
                    console.log(file);
                });

                if (program.output) {
                    
                }
            });
    });

    program.parse(process.argv);
