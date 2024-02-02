import Button from "./ButtonComponent"
import ButtonList from "./ButtonListComponent"
import "../css/NoteEditorComponent.css"
import { ChangeEvent, useEffect, useState } from "react"
import { tokenUtils } from "../utils/token";
import InformationBox from "./InformationTextComponent";
import { informationTypes } from "../global/variables";
import { NoteEditMessages } from "../global/textData";
import { noteEditStatusTypes } from "../global/variables";

interface noteEditorProps {
    noteID: number;
    setNoteIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNoteClickedID: React.Dispatch<React.SetStateAction<number | null>>;
    setAreNotesUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NoteEditor( {noteID,setNoteIsOpen, setNoteClickedID, setAreNotesUpdated}: noteEditorProps) {

    const [noteName, setNoteName] = useState("");
    const [noteText, setNoteText] = useState("");
    const [informationMessageType, setInformationMessageType] = useState<null | string>(null);
    const [isNoteSaveOn, setIsNoteSaveOn] = useState(false);
    const [isNoteDataLoaded, setIsNoteDataLoaded] = useState(false);
    const token = tokenUtils.getToken();
    let informationHeader = "";
    let informationText = "";
    let informationType = "";
    
    function handleNoteNameChange(e: ChangeEvent<HTMLInputElement>) {
        setNoteName(e.target.value);
    } 

    function handleNoteTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setNoteText(e.target.value);
    }

    function saveNote() {
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
                    setIsNoteSaveOn(false);
                    setInformationMessageType(noteEditStatusTypes.noteSuccessfullySaved);
                }
                else setInformationMessageType(noteEditStatusTypes.noteSaveError);
            })
            .catch((err) => {
                console.log(err);
            setInformationMessageType(noteEditStatusTypes.noteSaveError);
            })
        }
        catch(err) {
            console.log(err);
            setInformationMessageType(noteEditStatusTypes.noteSaveError);
        }
    }

    function getNoteFromServer() {
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
                if (res.ok) {
                    const response = await res.json()
                    const {name,text} = response;
                    console.log(name + " / " + text);
                    setNoteName(name);
                    setNoteText(text);
                    setIsNoteDataLoaded(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setInformationMessageType(noteEditStatusTypes.noteLoadError);
            })
        }
        catch(err) {
            console.log(err);
            setInformationMessageType(noteEditStatusTypes.noteLoadError);
        }
    }

    function handleSaveNoteButtonClick() {
        setIsNoteSaveOn(true);
    }

    function handleClearNoteButtonClick() {
        setNoteName("");
        setNoteText("");
        setIsNoteSaveOn(true);
    }

    function handleReturnButtonClick() {
        setNoteIsOpen(false);
        setAreNotesUpdated(false);
        setNoteClickedID(null); 
    }

    if (!isNoteDataLoaded) getNoteFromServer();
    if (isNoteSaveOn) saveNote();
    
    if(informationMessageType) {
        if (informationMessageType === noteEditStatusTypes.noteSuccessfullySaved) {
            informationHeader = NoteEditMessages.noteSuccessfullySaved.header;
            informationText = NoteEditMessages.noteSuccessfullySaved.text;
            informationType = informationTypes.success;
        }
        if (informationMessageType === noteEditStatusTypes.noteSuccessfullyCleared) {
            informationHeader = NoteEditMessages.noteSuccessfullyCleared.header;
            informationText = NoteEditMessages.noteSuccessfullyCleared.text;
            informationType = informationTypes.success;
        }
        if (informationMessageType === noteEditStatusTypes.noteSaveError) {
            informationHeader = NoteEditMessages.noteSaveError.header;
            informationText = NoteEditMessages.noteSaveError.text;
            informationType = informationTypes.error;
        }
        if (informationMessageType === noteEditStatusTypes.noteLoadError) {
            informationHeader = NoteEditMessages.noteLoadError.header;
            informationText = NoteEditMessages.noteLoadError.text;
            informationType = informationTypes.error;
        }
        if (informationMessageType === noteEditStatusTypes.noteClearError) {
            informationHeader = NoteEditMessages.noteClearError.header;
            informationText = NoteEditMessages.noteClearError.text;
            informationType = informationTypes.error;
        }
    }
    
    useEffect( () => {
         if (!informationMessageType) return;

         setTimeout( () => {
            setInformationMessageType(null);
         }, 2000)
    }, [informationMessageType])
    
    return (
        <div className="note-editor">
            {informationMessageType ? 
            <InformationBox header={informationHeader} text={informationText} type={informationType}/> : null}

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