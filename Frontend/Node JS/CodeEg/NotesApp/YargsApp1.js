/*

Yargs
    It is a very complex library;
    It has a ton of features for parsing all sort of command line arguments; // TODO: is it used for validation also?
    
Installation
    npm install yargs@12.0.2 --save
        Save flag updates the package.json file;
        If you leave off save flag, yargs library gets installed to node_modules folder;
        But, if you wipe that yars folder in node_modules later and run 'npm install', yars won't get reinstalled
        because it's not listed in package.json file; That is why save flag is useful;

Yargs parses the command line arguments when you actually access yargs.argv OR when you call yargs.parse();
*/

const yargs = require('yargs');
console.log(process.argv);      // It is an array of raw arguments;
console.log(yargs.argv);        // It is an object of processed arguments;

var cmd = yargs.argv._[0]; // process.argv[2];
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
Output:
> node YargsApp1.js add
[
    '/usr/local/bin/node',                                                              // Path to node
    '/Users/mcheedhe/Data-new/Technical/UI Tech/Node JS/CodeEg/YargsApp/YargsApp1.js',  // Path to YargsApp1.js
    'add'                                                                               // Actual arguments
]
{ _: [ 'add' ], '$0': 'YargsApp1.js' }
Adding a note...
---------------------------------------------------------------------------------
> node YargsApp1.js add encrypted        # In this case, yargs is not very useful!
[
  '/usr/local/bin/node',
  '/Users/mcheedhe/Data-new/Technical/UI Tech/Node JS/CodeEg/YargsApp/YargsApp1.js',
  'add',
  'encrypted'
]
{ _: [ 'add' ], title: 'note1', '$0': 'YargsApp1.js' }
Adding a note...
---------------------------------------------------------------------------------
>node YargsApp1.js add --title='note1'  # Yargs is pretty useful, when you pass a command with a set of options(key-value args);
[
  '/usr/local/bin/node',
  '/Users/mcheedhe/Data-new/Technical/UI Tech/Node JS/CodeEg/YargsApp/YargsApp1.js',
  'add',
  '--title=note1'
]
{ _: [ 'add' ], title: 'note1', '$0': 'YargsApp1.js' }
Adding a note...
---------------------------------------------------------------------------------
> node YargsApp1.js add --title 'note2'      # Yargs still works, this is where it shines really well!
[
  '/usr/local/bin/node',
  '/Users/mcheedhe/Data-new/Technical/UI Tech/Node JS/CodeEg/YargsApp/YargsApp1.js',
  'add',
  '--title',
  'note2'
]
{ _: [ 'add' ], title: 'note2', '$0': 'YargsApp1.js' }
Adding a note...
*/
