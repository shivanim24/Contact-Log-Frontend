import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ name: "", mobileno: "", email: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.name, note.mobileno, note.email);
        setNote({ name: "", mobileno: "", email: "" }); // Clear input fields after submission
        props.showAlert("Added Successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-3">
            <h2>Add a New Contact</h2>
            <form>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={note.name} 
                        onChange={onChange} 
                        minLength={3} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobileno" className="form-label">Mobile Number</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="mobileno" 
                        name="mobileno" 
                        value={note.mobileno} 
                        onChange={onChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={note.email} 
                        onChange={onChange} 
                        required 
                    />
                </div>
                <button 
                    disabled={note.name.length < 3 || note.mobileno.length === 0 || note.email.length === 0} 
                    type="submit" 
                    className="btn btn-primary" 
                    onClick={handleClick}
                >
                    Add Contact
                </button>
            </form>
        </div>
    );
};

export default AddNote;
