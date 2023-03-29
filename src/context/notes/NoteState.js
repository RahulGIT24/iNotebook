import { useState } from "react";
import NoteContext from "./noteContext";
import api_address from "../api/config";

const { fetchNote, deleteNotes, updateNote, addNotes } = api_address;

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Fetch all notes
  const getNote = async () => {
    let url = fetchNote;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json,fetchNote);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(addNotes, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    let url = `${deleteNotes}${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call

    let url = `${updateNote}${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json = response.json();

    // Logic to edit note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element.id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
      }
    }
    getNote();
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
