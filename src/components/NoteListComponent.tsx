import { Children, ReactNode } from "react"
import "../css/NoteListComponent.css"

interface NoteListProps {
    children: ReactNode;
}
export default function NoteList({children}: NoteListProps) {
    return (<div className="note-list">{children}</div>)
}