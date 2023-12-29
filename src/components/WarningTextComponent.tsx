import "../css/WarningTextComponent.css"

export default function Warning(props: {header?:string, text:string}) {
    return (
        <div className="warning">
            {props.header ? <h1 className="warning__header">{props.header}</h1> : null}
            <p className="warning__text">{props.text}</p>
        </div>
    )
}