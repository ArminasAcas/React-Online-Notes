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
    const [areNotesUpdated, setAreNotesUpdated] = useState(false);

    function handleNewNoteClick() {

    }

    function handleDeleteNoteClick() {

    }

    function getLatestNotes() {
        try {
            const token = tokenUtils.getToken();
            
            fetch("http://localhost:3500/api/getLatestNotes",
            {
                method: "POST",
                headers: {
                    "content-Type": "application/json", 
                    Authorization: `Bearer ${token}` 
                },
            })
            .then( async (res) => {
                if (res.status === 200) {
                    const response = await res.json()
                    const {notes} = response;
                    setNoteList(notes);
                    setAreNotesUpdated(true);
                }
            })
            .catch()
        }
        catch(err) {

        }
    }

   if (!areNotesUpdated) {
     getLatestNotes();
   }

   
   const notes = noteList.map( (note) => {
    return <NotePreview key={note.id} noteID={note.id} text={note.name}/>
    }); 

    if (!noteIsOpen) return (
        <>
            <Navbar/>
            <ButtonList>
                <Button text="Add new Note" onClick={handleNewNoteClick}></Button>
                <Button text="Delete Notes" onClick={handleDeleteNoteClick}></Button>
            </ButtonList>
            
            <NoteList>
                {notes}
            </NoteList>
            <Footer/>
        </>
    )
    
    else return (
        <>
        <Navbar/>
            <NoteEditor/>
        <Footer/>
    </>
    )
}