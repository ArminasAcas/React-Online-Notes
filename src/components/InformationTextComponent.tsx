import "../css/InformationTextComponent.css"
import { informationType } from "../global/variables";

export default function Warning(props: {header?:string, text:string, type:string}) {

    let InformationClassCompute = "information ";
    if (props.type === informationType.success) InformationClassCompute += " information--success";
    if (props.type === informationType.warning) InformationClassCompute += "information--warning";
    if (props.type === informationType.error) InformationClassCompute += "information--error";

    return (
        <div className={InformationClassCompute}>
            {props.header ? <h1 className="information__header">{props.header}</h1> : null}
            <p className="information__text">{props.text}</p>
        </div>
    )
}