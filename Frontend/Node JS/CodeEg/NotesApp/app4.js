/*
In app4.js, refactor functions to use arrow functions!
*/
const yargs = require('yargs');
const notes = require('./Notes.js');

yargs.command({
    command: 'add',
    describe: 'It adds a new note',
    builder: {                          // Object that defines all options supported!
        title: {                        // title argument
            describe: 'Note Title',
            demandOption: true,          // Mandatory! It defaults to false;
            type: 'string'
        },
        body: {                         // body argument
            describe: 'Note Description',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'list',
    describe: 'Get all notes',
    handler() {
        notes.printAll();
    }
});

yargs.command({
    command: 'read',
    describe: 'Get a note',
    builder: {
        title: {
            describe: 'Description about parameter!',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.getNote(argv.title);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Description about parameter!',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

yargs.parse();

/*
Output:
---------------------------------------------------------------------------------
> node app2.js add --title='note1' --body
Adding note:  note1 true
---------------------------------------------------------------------------------
> node app3.js add --title='note1' --body
Adding note:  note1 
---------------------------------------------------------------------------------
> node app3.js list
Getting all notes..
---------------------------------------------------------------------------------
> node app3.js read --title
Getting note 
> node app3.js read --title='note1'
Getting note note1
---------------------------------------------------------------------------------
> node app3.js remove
Missing required argument: title
> node app3.js remove --title='note1'
Removing a note note1

*/