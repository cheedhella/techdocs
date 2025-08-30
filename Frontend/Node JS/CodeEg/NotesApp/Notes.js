/*
    Install chalk -> npm install chalk@2.4.1 --save 
*/
const fs = require('fs');
const chalk = require('chalk');

// addNote() takes title and body as input;
var addNote = (title, body) => {
    // Load existing notes!
    const notes = loadNotes();

    // Check if there already exists another note with same title!
    // const anyDuplicateNotes = notes.filter((note) => note.title === title );
    // filter loops through all elements, whether match is found or not!
    // in this case, we want to stop looping once a match is found!

    const anyDuplicateNote = notes.find((note) => note.title === title );
    // if(anyDuplicateNotes.length === 0) { // note with same title doesn't exist!
    if(!anyDuplicateNote) {
        const note = {title, body}; // {title: title, body: body}
        notes.push(note);
        saveNotes(notes);
        console.log(chalk.green.inverse('Added note!'));
    } else {
        console.log(chalk.red.inverse('Note already exists!'));
    }    
}

// printAll() doesn't need any input;
var printAll = () => {
    console.log(chalk.green.inverse('Getting all notes..'));
    const notes = loadNotes();
    notes.forEach((note) => console.log(note.title, '-', note.body));
}

// getNote() requires title as input;
var getNote = (title) => {
    console.log(chalk.green.inverse('Getting the note..'));
    const notes = loadNotes();
    const note = notes.find((n) => n.title === title);
    if(note) {
        console.log(note.title, '-', note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}

// removeNote() requires title as input;
var removeNote = (title) => {
    console.log(chalk.green.inverse('Removing the note', title));

    // Load existing notes!
    const notes = loadNotes();

    // Check if there already exists another note with same title!
    const notesToKeep = notes.filter((note) => note.title !== title );
    if(notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Removed note!'));
    } else {
        console.log(chalk.red.inverse('Couldnot find any such note!'));
    }
}

var loadNotes = () => {
    try {
         // Returns the contents of files as bytes!
        // It throws excpetion, if the file doesn't exist!
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString(); // Convert the bytes to String!
        return JSON.parse(dataJson);
    } catch(e) {
        console.log('Couldnot find notes.json...');
        return [];
    }
}

var saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    // Creates file, if it doesn't exist! Otherwise, it overwrites the content!
    fs.writeFileSync('notes.json', dataJson);
}

/*
In ES6, When you are setting an object attribute and value that's a variable and
they both are exactly same, you can actually leave off the colon and the value.
Either way, the result is identical;
*/
module.exports = {
    addNote: addNote,
    printAll,
    getNote,
    removeNote
}