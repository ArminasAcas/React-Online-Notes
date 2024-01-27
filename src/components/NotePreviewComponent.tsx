import "../css/NotePreviewComponent.css"
import "../css/CustomScrollBar.css"
import { useState } from "react";

interface NotePreviewProps {
    header?: string;
    text: string;
}

export default function NotePreview({header="Note", text}: NotePreviewProps) {
    
    const [hasMouseEntered, setHasMouseEntered] = useState(false);

    function handleMouseEnter(){
        setHasMouseEntered(true);
    };

    function handleMouseLeave() {
        setHasMouseEntered(false);
    }

    return (
        <div className={hasMouseEntered ? "note-preview scroll-bar note-preview--hover" : "note-preview scroll-bar"} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        >
            <h3 className={hasMouseEntered ? "note-preview__header note-preview__header--hover" : "note-preview__header"}>
                {header}
            </h3>
            <h3 className="note-preview__text">{text}</h3>
        </div>
    )
}