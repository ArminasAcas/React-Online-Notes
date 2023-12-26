import "../css/WarningTextComponent.css"

export default function Warning(props: {header:string, text:string}) {
    return (
        <div className="warning">
            <h1 className="warning__header">{props.header}</h1>
            <p className="warning__text">{props.text}</p>
        </div>
    )
}