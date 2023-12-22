import "../css/RegisterFormComponent.css"
import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"
import Form from "./FormComponent"
import Header from "./HeaderComponent"

export default function RegisterForm() {
    return (
        <Form>
            <Header text="Register"/>
            <Label htmlFor="username" text="Username"/>
            <InputText type="text" id="username" name="username"/>
            <Label htmlFor="email" text="Email"/>
            <InputText type="text" id="email" name="email"/>
            <Label htmlFor="password" text="Password"/>
            <InputText type="password" id="password" name="password"/>
            <Label htmlFor="repeatPassword" text="Repeat password"/>
            <InputText type="password" id="repeatPassword" name="repeatPassword"/>
            <InputButton type="submit" value="Register"/>
        </Form>
    )
}