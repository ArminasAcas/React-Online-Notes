import "../css/InformationTextComponent.css"
import { informationTypes } from "../global/variables";

export default function Warning(props: {header?:string, text:string, type:string}) {

    let InformationClassCompute = "information ";
    if (props.type === informationTypes.success) InformationClassCompute += " information--success";
    if (props.type === informationTypes.warning) InformationClassCompute += "information--warning";
    if (props.type === informationTypes.error) InformationClassCompute += "information--error";

    return (
        <div className={InformationClassCompute}>
            {props.header ? <h1 className="information__header">{props.header}</h1> : null}
            <p className="information__text">{props.text}</p>
        </div>
    )
}