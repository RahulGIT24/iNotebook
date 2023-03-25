import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  let host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Fetch all notes
  const getNote = async () => {
    let url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZWMzZWViNGZhY2U5YTZmY2JhNGEyIn0sImlhdCI6MTY3OTczNzgzOH0.7iGPwnbuOTWaBuW_AjqmoTdjrkSRz191ULX4cxn4Xkg",
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZWMzZWViNGZhY2U5YTZmY2JhNGEyIn0sImlhdCI6MTY3OTczNzg3N30.1yPLZ8apfDxG9I5O-Po_WWden27o9xyTC7wBQsG8JUU",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    let url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZWMzZWViNGZhY2U5YTZmY2JhNGEyIn0sImlhdCI6MTY3OTczNzgzOH0.7iGPwnbuOTWaBuW_AjqmoTdjrkSRz191ULX4cxn4Xkg",
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

    let url = `${host}/api/notes/updatenote/6419b33e1a8718ecbbce4ad4`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZWMzZWViNGZhY2U5YTZmY2JhNGEyIn0sImlhdCI6MTY3OTczNzgzOH0.7iGPwnbuOTWaBuW_AjqmoTdjrkSRz191ULX4cxn4Xkg",
      },
      body: JSON.stringify(title, description, tag),
    });
    const json = response.json();

    // Logic to edit note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element.id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
