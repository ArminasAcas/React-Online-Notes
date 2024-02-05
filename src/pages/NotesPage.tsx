import Navbar from "../components/NavbarComponent"
import Footer from "../components/FooterComponent"
import NotePreview from "../components/NotePreviewComponent"
import Button from "../components/ButtonComponent"
import NoteList from "../components/NoteListComponent"
import ButtonList from "../components/ButtonListComponent"
import { useEffect, useState } from "react"
import NoteEditor from "../components/NoteEditorComponent"
import "../css/CustomScrollBar.css"
import { tokenUtils } from "../utils/token"
import { SortButtonTextList } from "../global/textData"

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
    const [sortMode, setSortMode] = useState<number>(0);
    const [areNotesSorted, setAreNotesSorted] = useState(false);
    const token = tokenUtils.getToken();
    let sortButtonText = SortButtonTextList.default;

    function addNewNote() {
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
                    setAreNotesSorted(false);
                }
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    function deleteNote() {
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

    function deleteAllNotes() {
        try {
            fetch("http://localhost:3500/api/deleteAllNotes",
            {
                method: "POST",
                headers: {
                    "content-Type": "application/json", 
                    Authorization: `Bearer ${token}` 
                }
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

    function sortNoteList() {

        if (sortMode === 0) return;
        if (sortMode === 1) sortButtonText = SortButtonTextList.sortAsc;
        if (sortMode === 2) sortButtonText = SortButtonTextList.sortDesc;
        if (areNotesSorted) return;

        let sortedNotes : Note[];
        sortedNotes = [...noteList];

        if (sortMode === 1) {
            sortedNotes.sort((a, b) => a.name.localeCompare(b.name));
        }
    
        if (sortMode === 2) {
            sortedNotes.sort((a, b) => b.name.localeCompare(a.name));
        }

        setNoteList(sortedNotes);
        setAreNotesSorted(true);
    }

    function handleCreateNoteButtonClick() {
        addNewNote();
    }

    function handleDeleteNoteButtonClick() {
        if (!isDeleteModeActive) setNoteClickedID(null);
        setIsDeleteModeActive(!isDeleteModeActive);
    }
    
    function handleDeleteAllNotesButtonClick() {
       deleteAllNotes();
    }

    function handleSortNotesButtonClick() {
        if (sortMode + 1 > 2) {
            setSortMode(0);
            setAreNotesUpdated(false);
        } 
        else {
            setSortMode( sortMode + 1);
            setAreNotesSorted(false);
        }
    }

    function handleNoteClick(notePreviewID: number) {
        setNoteClickedID(notePreviewID);
    }

   if (!areNotesUpdated) getLatestNotes();
   if(isDeleteModeActive && noteClickedID) deleteNote();
   if (noteClickedID && !isDeleteModeActive && !noteIsOpen) setNoteIsOpen(true)
   sortNoteList();
   
   const notes = noteList.map( (note) => {
    return <NotePreview 
        key={note.id} 
        noteID={note.id} 
        text={note.name} 
        onClick={handleNoteClick} 
        onMouseEnterSetColorRed={isDeleteModeActive}
        />
    }); 

    if (!noteIsOpen) return (
        <>
            <Navbar/>
            <ButtonList>
                <Button text="Add new Note" onClick={handleCreateNoteButtonClick}></Button>
                <Button text="Delete Notes" onClick={handleDeleteNoteButtonClick} onClickKeepPressed={isDeleteModeActive}></Button>
                <Button text="Delete All Notes" onClick={handleDeleteAllNotesButtonClick}></Button>
                <Button text={sortButtonText} onClick={handleSortNotesButtonClick}></Button>
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
            <NoteEditor 
            noteID={noteClickedID} 
            setNoteClickedID={setNoteClickedID} 
            setNoteIsOpen={setNoteIsOpen} 
            setAreNotesUpdated={setAreNotesUpdated}
            />
        <Footer/>
    </>
    )
}