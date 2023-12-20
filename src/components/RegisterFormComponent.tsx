import "../css/RegisterFormComponent.css"
import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"

export default function RegisterForm() {
    return (
        <div className="register">
            <form className="register__form">
                <h1 className="register__header">Register</h1>
                <Label htmlFor="username" text="Username"/>
                <InputText type="text" id="username" name="username"/>
                <Label htmlFor="email" text="Email"/>
                <InputText type="text" id="email" name="email"/>
                <Label htmlFor="password" text="Password"/>
                <InputText type="password" id="password" name="password"/>
                <Label htmlFor="repeatPassword" text="Repeat password"/>
                <InputText type="password" id="repeatPassword" name="repeatPassword"/>
                <InputButton type="submit" value="Register"/>
             </form>
        </div>   
    )
}