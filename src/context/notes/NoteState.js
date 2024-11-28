import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "https://contact-log-backend.onrender.com";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // GET ALL NOTES
    const getNotes = async () => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem('auth-token') },
        });
        console.log("Fetching All Contacts.");
        const json = await response.json();
        console.log(json);
        setNotes(json);
    };

    // ADD NOTE
    const addNote = async (name, mobileno, email) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem('auth-token') },
            body: JSON.stringify({ name, mobileno, email })
        });
        console.log("Adding a New Contact.");
        const note = await response.json();
        setNotes(notes.concat(note)); // Update the state by adding the new note
    };

    // DELETE NOTE
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem('auth-token') },
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const json = await response.json();
        console.log(json);

        console.log("Deleting a Contact with ID: " + id);
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes); // Update the state immediately
    };

    // EDIT NOTE
    const editNote = async (id, name, mobileno, email) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem('auth-token') },
            body: JSON.stringify({ name, mobileno, email })
        });
        const json = await response.json();
        console.log(json);

        // Change in frontend
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].name = name;
                newNotes[index].mobileno = mobileno;
                newNotes[index].email = email;
                break;
            }
        }
        setNotes(newNotes);
    };

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
