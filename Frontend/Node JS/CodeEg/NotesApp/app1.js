const yargs = require('yargs');
const notes = require('./Notes');

yargs.parse();
var argv = yargs.argv;
var cmd = argv._[0];

if(cmd === 'add') {
    notes.addNote(argv.title, argv.body);
} else if(cmd === 'list') {
    notes.printAll();
} else if(cmd === 'read') {
    notes.getNote(argv.title);
} else if(cmd === 'remove') {
    notes.removeNote(argv.title);
} else {
    console.log('Command not recognised..');
}

/*
Output:
> node app1.js add --title='note1' --body='This is note1'
Adding note:  note1 This is note1
> node app1.js add 
Adding note:  undefined undefined
---------------------------------------------------------------------------------
> node app1.js list
Getting all notes..
---------------------------------------------------------------------------------
> node app1.js read
Getting note undefined
> node app1.js read --title='note1'
Getting note note1
---------------------------------------------------------------------------------
> node app1.js remove
Removing a note undefined
> node app1.js remove --title='note1'
Removing a note note1
*/