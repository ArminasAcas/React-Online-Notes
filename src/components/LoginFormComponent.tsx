import "../css/LoginFormComponent.css"
import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"


export default function LoginForm() {
    return (
        <div className="login">
            <form className="login__form">
                <h1 className="login__header">Login</h1>
                <Label htmlFor="username" text="Username" />
                <InputText type="text" id="username" name="username" />
                <Label htmlFor="password" text="Password" />
                <InputText type="password" id="password" name="password" />
                <InputButton type="submit" value="Log in"/>
             </form>
        </div>   
    )
}