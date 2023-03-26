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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZWMzZWViNGZhY2U5YTZmY2JhNGEyIn0sImlhdCI6MTY3OTg0MjgxOH0.gdW4cJKsTAtdsFSfQ62Jvcy00RSjjVE9KRZbjvMAmzA",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZWMzZWViNGZhY2U5YTZmY2JhNGEyIn0sImlhdCI6MTY3OTg0MjgxOH0.gdW4cJKsTAtdsFSfQ62Jvcy00RSjjVE9KRZbjvMAmzA",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZWMzZWViNGZhY2U5YTZmY2JhNGEyIn0sImlhdCI6MTY3OTg0MjgxOH0.gdW4cJKsTAtdsFSfQ62Jvcy00RSjjVE9KRZbjvMAmzA",
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

    let url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZWMzZWViNGZhY2U5YTZmY2JhNGEyIn0sImlhdCI6MTY3OTg0MjgxOH0.gdW4cJKsTAtdsFSfQ62Jvcy00RSjjVE9KRZbjvMAmzA",
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
