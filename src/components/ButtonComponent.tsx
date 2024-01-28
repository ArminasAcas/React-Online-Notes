import "../css/ButtonComponent.css"

export default function Button(props: {text:string, onClick?: () => void}) {
    return <button type="button" onClick={props.onClick} className="button">{props.text}</button>
}