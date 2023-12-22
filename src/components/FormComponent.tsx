import { ReactNode } from "react";
import "../css/FormComponent.css"
import Container from "./ContainerComponent";

interface FormProps {
    children: ReactNode;
}

export default function Form({children} : FormProps) {

    return(
        <Container type="small">
            <form className="form__container">
                {children}
            </form>
        </Container>
    )
}