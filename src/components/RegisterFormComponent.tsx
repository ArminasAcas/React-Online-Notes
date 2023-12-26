import "../css/RegisterFormComponent.css"
import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"
import Form from "./FormComponent"
import Header from "./HeaderComponent"
import React, { useState } from "react"
import Warning from "./WarningTextComponent"
import { warningTypes } from "../global/variables"
import { warningMessages } from "../global/textData"

export default function RegisterForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [warning, setWarning] = useState("");
    let warningText = "";

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setWarning("");
        
        if (password !== repeatPassword){
            setWarning(warningTypes.PasswordsNotEqual);
            setPassword("");
            setRepeatPassword("");
        }
    }

    if (warning.length > 0) {
        if (warning === warningTypes.PasswordsNotEqual) warningText = warningMessages.PasswordsNotEqual;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Header text="Register"/>
            <Label htmlFor="username" text="Username"/>
            <InputText type="text" id="username" name="username" value={username} onChange={handleUsernameChange} isRequired={true} minLenght={6} maxLenght={32}/>
            <Label htmlFor="email" text="Email"/>
            <InputText type="email" id="email" name="email" value={email} onChange={handleEmailChange} isRequired={true}/>
            <Label htmlFor="password" text="Password"/>
            <InputText type="password" id="password" name="password" value={password} onChange={handlePasswordChange} isRequired={true} minLenght={8} maxLenght={64}/>
            <Label htmlFor="repeatPassword" text="Repeat password"/>
            <InputText type="password" id="repeatPassword" name="repeatPassword" value={repeatPassword} onChange={handleRepeatPasswordChange} isRequired={true} minLenght={8} maxLenght={64}/>
            <InputButton type="submit" value="Register"/>
            {warning ? <Warning header="Warning" text={warningText}/> : null}
        </Form>
    )
}