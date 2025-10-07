/*
In app1.js, command line arguments to all commands are optional;
If needed, you can mark them mandatory;
*/
const yargs = require('yargs');
const notes = require('./Notes.js');

yargs.command({
    command: 'add',
    describe: 'It adds a new note',
    builder: {                          // Object that defines all options supported!
        title: {                        // title argument
            describe: 'Note Title',
            demandOption: true          // Mandatory! It defaults to false;
        },
        body: {                         // body argument
            describe: 'Note Description',
            demandOption: true
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'list',
    describe: 'Get all notes',
    handler: function() {
        notes.printAll();
    }
});

yargs.command({
    command: 'read',
    describe: 'Get a note',
    builder: {
        title: {
            describe: 'Description about parameter!',
            demandOption: true
        }
    },
    handler: function(argv) {
        notes.getNote(argv.title);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Description about parameter!',
            demandOption: true
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title);
    }
});

yargs.parse();

/*
Output:
---------------------------------------------------------------------------------
> node app2.js add
app2.js add
It adds a new note!
Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --title    Note Title                                               [required]
  --body     Note Description                                         [required]

Missing required arguments: title, body
---------------------------------------------------------------------------------
> node app2.js add --title='note1' --body='This is note1'
Adding note:  note1 This is note1
---------------------------------------------------------------------------------
> node app2.js list
Getting all notes..
---------------------------------------------------------------------------------
> node app2.js read
Missing required argument: title

> node app2.js read --title='note1'
Getting note note1
---------------------------------------------------------------------------------
> node app2.js remove
Missing required argument: title
> node app2.js remove --title='note1'
Removing a note note1

*/