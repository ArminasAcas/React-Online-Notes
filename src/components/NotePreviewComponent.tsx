import "../css/NotePreviewComponent.css"
import "../css/CustomScrollBar.css"
import { useState } from "react";

interface NotePreviewProps {
    header?: string;
    text: string;
    noteID?: number;
    onClick: (noteID: number) => void;
    onMouseEnterSetColorRed?: boolean;
}

export default function NotePreview({header="Note", text, noteID, onClick, onMouseEnterSetColorRed=false}: NotePreviewProps) {
    
    const [hasMouseEntered, setHasMouseEntered] = useState(false);
    let noteClassNames = "note-preview scroll-bar";
    let noteHeaderClassNames = "note-preview__header";

    function handleMouseEnter(){
        setHasMouseEntered(true);
    };

    function handleMouseLeave() {
        setHasMouseEntered(false);
    }

    function handleClick() {
        if (noteID) onClick(noteID);
    }

    function selectClassnames() {
        if (hasMouseEntered && !onMouseEnterSetColorRed) {
            noteClassNames += " note-preview--hover";
            noteHeaderClassNames += " note-preview__header--hover";
        }

        if (hasMouseEntered && onMouseEnterSetColorRed) {
            noteClassNames += " note-preview--hover-red";
            noteHeaderClassNames += " note-preview__header--hover-red";
        }
    }

    selectClassnames();

    return (
        <div className={noteClassNames} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
            <h3 className={noteHeaderClassNames}>{header}</h3>
            <h3 className="note-preview__text">{text}</h3>
        </div>
    )
}