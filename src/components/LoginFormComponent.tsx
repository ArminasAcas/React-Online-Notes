import "../css/LoginFormComponent.css"
import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"
import Form from "./FormComponent"
import Header from "./HeaderComponent"


export default function LoginForm() {
    return (
        <Form>
            <Header text="Login"/>
            <Label htmlFor="username" text="Username" />
            <InputText type="text" id="username" name="username" />
            <Label htmlFor="password" text="Password" />
            <InputText type="password" id="password" name="password" />
            <InputButton type="submit" value="Log in"/>
        </Form>
    )
}