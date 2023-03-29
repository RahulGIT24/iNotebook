import React, { useContext } from "react";
import contextValue from "../context/notes/noteContext";
import contextValue1 from "../context/darkmode/darkContext";

// Importing fontwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function NoteItem(props) {
  const {renderAlert} = props;
  const context = useContext(contextValue);
  const context1 = useContext(contextValue1);
  const { deleteNote } = context;
  const { mode } = context1;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className={`card my-3 bg-${mode==='light'?'light':'dark'}`}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <i>
            <FontAwesomeIcon
              icon={faTrash}
              className="mx-2"
              onClick={() => {
                deleteNote(note._id);
                renderAlert("danger","Note deleted successfully")
              }}
            />
          </i>
          <i>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                updateNote(note);
              }}
            />
          </i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
