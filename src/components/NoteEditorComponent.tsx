import Button from "./ButtonComponent"
import ButtonList from "./ButtonListComponent"
import "../css/NoteEditorComponent.css"
import { ChangeEvent, useState } from "react"

export default function NoteEditor() {

    const [noteName, setNoteName] = useState("");
    const [noteText, setNoteText] = useState("");

    function handleNoteNameChange(e: ChangeEvent<HTMLInputElement>) {
        setNoteName(e.target.value);
    } 

    function handleNoteTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setNoteText(e.target.value);
    }

    return (
        <div className="note-editor">
            <ButtonList>
                <Button text="<"/>
                <Button text="Save Note"/>
                <Button text="Clear Note"/>
            </ButtonList>

            <h2 className="note-editor__label">Note name</h2>
            <input type="text" className="note-editor__header" maxLength={100} value={noteName} onChange={handleNoteNameChange}></input>
            <h2 className="note-editor__label">Note Text</h2>
            <textarea className="note-editor__text" maxLength={25000} value={noteText} onChange={handleNoteTextChange}></textarea>
        </div>
    )
}