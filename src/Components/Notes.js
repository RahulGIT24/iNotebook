import { useContext, useEffect } from "react";
import contextValue from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";

function NoteItem() {
  const context = useContext(contextValue);
  const { notes, getNote } = context;
  useEffect(()=>{
    getNote()
  },[])
  return (
    <>
      <Addnote></Addnote>
      <div className="row my-5">
        <h2>Your Notes</h2>
        {notes.map((note, _id) => {
          return <Noteitem note={note} key={_id} />;
        })}
      </div>
    </>
  );
}

export default NoteItem;
