import "../css/InputTextComponent.css"

export default function InputText(props: {id: string, name: string, type:string}) {

    return (
        <input className="input-text" type={props.type} id={props.id} name={props.name}></input>
    )
}