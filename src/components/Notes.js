import React, { useEffect, useRef, useState, useContext } from 'react';
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            getNotes();
        } else {
            navigate('/login');
        }
    }, []);

    const [note, setNote] = useState({ id: "", ename: "", emobileno: "", eemail: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ 
            id: currentNote._id, 
            ename: currentNote.name, 
            emobileno: currentNote.mobileno, 
            eemail: currentNote.email 
        });
    };

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
        editNote(note.id, note.ename, note.emobileno, note.eemail); // Update the note
        refClose.current.click(); // Close the modal
        props.showAlert("Updated Successfully", "success"); // Show the alert
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Contact</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="my-3">
                                    <label htmlFor="ename" className="form-label">Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="ename" 
                                        name="ename" 
                                        value={note.ename}
                                        onChange={onChange} 
                                        minLength={3} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emobileno" className="form-label">Mobile Number</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="emobileno" 
                                        name="emobileno" 
                                        value={note.emobileno}
                                        onChange={onChange} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eemail" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="eemail" 
                                        name="eemail" 
                                        value={note.eemail}
                                        onChange={onChange} 
                                        required 
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button 
                                disabled={note.ename.length < 3 || note.emobileno.length === 0 || note.eemail.length === 0} 
                                onClick={handleClick} 
                                type="button" 
                                className="btn btn-primary"
                            >
                                Update Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Your Contacts</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No Contacts to Display'}
                </div>
                {notes.length > 0 && notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
            </div>
        </div>
    );
};

export default Notes;
