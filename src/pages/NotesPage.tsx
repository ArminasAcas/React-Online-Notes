import Navbar from "../components/NavbarComponent"
import Footer from "../components/FooterComponent"
import NotePreview from "../components/NotePreviewComponent"
import Button from "../components/ButtonComponent"
import NoteList from "../components/NoteListComponent"
import ButtonList from "../components/ButtonListComponent"
import { useState } from "react"
import NoteEditor from "../components/NoteEditorComponent"
import "../css/CustomScrollBar.css"
import { tokenUtils } from "../utils/token"

interface Note {
    id: number,
    name: string;
    text: string;
}

export default function Notes() {

    const [noteList, setNoteList] = useState<Note[]>([]);
    const [noteIsOpen, setNoteIsOpen] = useState(false);
    const [isDeleteModeActive, setIsDeleteModeActive] = useState(false);
    const [noteClickedID, setNoteClickedID] = useState<number | null>(null);
    const [areNotesUpdated, setAreNotesUpdated] = useState(false);
    const token = tokenUtils.getToken();

    function handleCreateButtonClick() {
        try {
            fetch("http://localhost:3500/api/addNewNote",
            {
                method: "POST",
                headers: {
                    "content-Type": "application/json", 
                    Authorization: `Bearer ${token}` 
                },
            })
            .then( async (res) => {
                if (res.ok) {
                    setAreNotesUpdated(false);
                }
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    function handleDeleteButtonClick() {
        if (!isDeleteModeActive) setNoteClickedID(null);
        setIsDeleteModeActive(!isDeleteModeActive);
    }

    function handleNoteClick(notePreviewID: number) {
        setNoteClickedID(notePreviewID);
    }

    function getLatestNotes() {
        try {
            fetch("http://localhost:3500/api/getLatestNotes",
            {
                method: "POST",
                headers: {
                    "content-Type": "application/json", 
                    Authorization: `Bearer ${token}` 
                },
            })
            .then( async (res) => {
                if (res.ok) {
                    const response = await res.json()
                    const {notes} = response;
                    setNoteList(notes);
                    setAreNotesUpdated(true);
                }
            })
        }
        catch(err) {
            console.log(err);
        }
    }

   if (!areNotesUpdated) {
     getLatestNotes();
   }
   
   if(isDeleteModeActive && noteClickedID) {
        try {
            fetch("http://localhost:3500/api/deleteNote",
            {
                method: "POST",
                headers: {
                    "content-Type": "application/json", 
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({noteID : noteClickedID})
            })
            .then( async (res) => {
                if (res.ok) {
                    setNoteClickedID(null);
                    setAreNotesUpdated(false);
                }
            })
        }
        catch(err) {
            console.log(err);
        }
   }

   if (noteClickedID && !isDeleteModeActive && !noteIsOpen) setNoteIsOpen(true)
   
   const notes = noteList.map( (note) => {
    return <NotePreview key={note.id} noteID={note.id} text={note.name} onClick={handleNoteClick}/>
    }); 

    if (!noteIsOpen) return (
        <>
            <Navbar/>
            <ButtonList>
                <Button text="Add new Note" onClick={handleCreateButtonClick}></Button>
                <Button text="Delete Note" onClick={handleDeleteButtonClick}></Button>
            </ButtonList>
            
            <NoteList>
                {notes}
            </NoteList>
            <Footer/>
        </>
    )
    
    if (noteIsOpen && noteClickedID) return (
    <>
        <Navbar/>
            <NoteEditor noteID={noteClickedID} setNoteClickedID={setNoteClickedID} setNoteIsOpen={setNoteIsOpen} setAreNotesUpdated={setAreNotesUpdated}/>
        <Footer/>
    </>
    )
}