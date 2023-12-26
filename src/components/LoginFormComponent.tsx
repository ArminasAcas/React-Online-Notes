import "../css/LoginFormComponent.css"
import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"
import Form from "./FormComponent"
import Header from "./HeaderComponent"
import { useState } from "react"

export default function LoginForm() {

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Header text="Login"/>
            <Label htmlFor="username" text="Username" />
            <InputText type="text" id="username" name="username" value={username} onChange={handleUsernameChange} isRequired={true}/>
            <Label htmlFor="password" text="Password" />
            <InputText type="password" id="password" name="password" value={password} onChange={handlePasswordChange} isRequired={true}/>
            <InputButton type="submit" value="Log in" />
        </Form>
    )
}