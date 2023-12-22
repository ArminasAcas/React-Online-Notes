import "../css/HeaderComponent.css"

export default function Header(props: {text:string}) {

    if (!props.text) return;
    
    return (
        <h1 className="header">{props.text}</h1>
    )
}