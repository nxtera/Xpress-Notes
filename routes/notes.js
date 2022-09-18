const notes = require('express').Router();
const {  readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils')
const { v4: uuidv4 } = require('uuid');


// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // POST Route creating a new note
  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });

  // DELETE Route for a specific tip
notes.delete('/:id', (req, res) => {
    const tipId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== tipId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${tipId} has been deleted 🗑️`);
      });
  });
  
  module.exports = notes;
