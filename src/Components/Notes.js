import { useContext, useEffect, useRef, useState } from "react";
import contextValue from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const {renderAlert} = props;
  const context = useContext(contextValue);
  const { notes, getNote, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){
      getNote();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  // const { addNote } = context;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    renderAlert("success","Note updated successfully")
    // e.preventDefault();
  };
  return (
    <>
      <Addnote renderAlert = {renderAlert}></Addnote>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 ||
                  note.edescription.length < 5 ||
                  note.etag.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <h2>Your Notes</h2>
        <div className="container my-3">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note, _id) => {
          return <Noteitem note={note} key={_id} updateNote={updateNote} renderAlert = {renderAlert}/>;
        })}
      </div>
    </>
  );
}

export default Notes;
