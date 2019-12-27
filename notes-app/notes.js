const fs = require('fs');
const chalk = require("chalk");

const readNote = (title) => {

    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if (note) {
      console.log(chalk.blue.bold(note.body))
    } else {
      console.log(chalk.red.inverse.bold("Note NOT FOUND"))
    }
}

const listNotes = () => {

    const notes = loadNotes();
    notes.forEach((note) => {
      console.log(chalk.blue.bold(note.title))
      console.log("");
      console.log(chalk.blue.bold(note.body))
    })
}

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes);
    console.log(chalk.green.inverse("New Note Added"))
  } else {
    console.log(chalk.red.inverse("No New Note Added"))
  }
}

const removeNote = (title) => {
  console.log("removing " + title)
  const notes = loadNotes();
  const newNotes = [];
  const duplicateNotes = notes.filter(function (note) {
      if (note.title != title)
      {
        newNotes.push(note)
      }
  })

  if (notes.length > newNotes.length)
  {
    saveNotes(newNotes)
    console.log(chalk.green.inverse.bold("Note removed"))
  } else {
    console.log(chalk.red.inverse.bold("Note not removed"))
  }
}
const saveNotes = (notes) => {
  const data = JSON.stringify(notes);
  fs.writeFileSync("notes.json", data)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json")
    const notes = dataBuffer.toString()
    return JSON.parse(notes)
  } catch (e) {
    return []
  }
}

module.exports = {
  readNote: readNote,
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote
}
