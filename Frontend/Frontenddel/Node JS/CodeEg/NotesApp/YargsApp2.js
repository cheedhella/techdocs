const yargs = require('yargs');
console.log(yargs.argv);

var cmd = yargs.argv._[0];
if(cmd === 'add') {
    console.log('Adding a note...');
} else if(cmd === 'list') {
    console.log('Listing all notes...');
} else if(cmd === 'read') {
    console.log('Getting a note');
} else if(cmd === 'remove') {
    console.log('Removing a note');
} else {
    console.log('Command not recognised..');
}

/*
When using Yargs, by default, we also get pretty useful behaviour;

Output:
> node YargsApp2.js --help                   # It prints cheat sheet of yargs;
Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
---------------------------------------------------------------------------------
> node YargsApp2.js --version                # It prints app version; Defaults to 1.0.0;
1.0.0

If you want set it to customer version, use this: yargs.version('1.1.0'); 
It should be called before yargs parsing command line arguments either by accessing yargs.argv OR yargs.parse();
Otherwise, it has no effect;
*/


