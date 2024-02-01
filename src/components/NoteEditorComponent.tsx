import Button from "./ButtonComponent"
import ButtonList from "./ButtonListComponent"
import "../css/NoteEditorComponent.css"
import { ChangeEvent, useState } from "react"
import { tokenUtils } from "../utils/token";

interface noteEditorProps {
    noteID: number;
    setNoteIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNoteClickedID: React.Dispatch<React.SetStateAction<number | null>>;
    setAreNotesUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NoteEditor( {noteID,setNoteIsOpen, setNoteClickedID, setAreNotesUpdated}: noteEditorProps) {

    const [noteName, setNoteName] = useState("");
    const [noteText, setNoteText] = useState("");
    const [isNoteDataLoaded, setIsNoteDataLoaded] = useState(false);
    const token = tokenUtils.getToken();
    
    function handleNoteNameChange(e: ChangeEvent<HTMLInputElement>) {
        setNoteName(e.target.value);
    } 

    function handleNoteTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setNoteText(e.target.value);
    }

    function handleSaveNoteButtonClick() {
        try {
            fetch("http://localhost:3500/api/updateNote",
            {
                method: "POST",
                headers: {
                    "content-Type": "application/json", 
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({noteID : noteID, text: noteText, name: noteName})
            })
            .then( async (res) => {
                if (res.ok) {
                    
                }
            })
        }
        catch(err) {
            console.log("err");
        }
    }

    function handleClearNoteButtonClick() {
        setNoteName("");
        setNoteText("");
    }

    function handleReturnButtonClick() {
        setNoteIsOpen(false);
        setAreNotesUpdated(false);
        setNoteClickedID(null); 
    }

    if (!isNoteDataLoaded) {

        try {
            fetch("http://localhost:3500/api/getNote",
            {
                method: "POST",
                headers: {
                    "content-Type": "application/json", 
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({noteID: noteID})
            })
            .then( async (res) => {
                const response = await res.json()
                const {name,text} = response;
                console.log(name + " / " + text);
                setNoteName(name);
                setNoteText(text);
                setIsNoteDataLoaded(true);
            })
        }
        catch {

        }
    }

    return (
        <div className="note-editor">
            <ButtonList>
                <Button text="<" onClick={handleReturnButtonClick}/>
                <Button text="Save Note" onClick={handleSaveNoteButtonClick}/>
                <Button text="Clear Note" onClick={handleClearNoteButtonClick}/>
            </ButtonList>

            <h2 className="note-editor__label">Note name</h2>
            <input type="text" className="note-editor__header" maxLength={100} value={noteName} onChange={handleNoteNameChange}></input>
            <h2 className="note-editor__label">Note Text</h2>
            <textarea className="note-editor__text" maxLength={25000} value={noteText} onChange={handleNoteTextChange}></textarea>
        </div>
    )
}