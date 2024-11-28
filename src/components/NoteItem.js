import React, { useContext } from 'react';
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const { deleteNote } = useContext(noteContext);
    const { note, updateNote } = props;

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.name}</h5>
                    <p className="card-text">
                        <strong>Mobile:</strong> {note.mobileno}<br />
                        <strong>Email:</strong> {note.email}
                    </p>
                    <i 
                        className="fa-solid fa-trash mx-2" 
                        onClick={() => {
                            deleteNote(note._id);
                            props.showAlert('Deleted Successfully', 'success');
                        }}
                    ></i>
                    <i 
                        className="fa-solid fa-pen-to-square mx-2" 
                        onClick={() => {
                            updateNote(note);
                        }}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
