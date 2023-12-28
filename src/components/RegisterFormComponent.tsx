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

        if (username.length < 6){
            setWarning(warningTypes.ShortUsername);
            return;
        }

        if (password.length < 8){
            setWarning(warningTypes.ShortPassword);
            return;
        }

        if (!/\d/.test(password)){
            setWarning(warningTypes.PasswordMissingDigit);
            return
        }

        if (!/[a-z]/.test(password)){
            setWarning(warningTypes.PasswordMissingLowerCaseCharacter);
            return;
        }

        if (!/[A-Z]/.test(password)){
            setWarning(warningTypes.PasswordMissingUpperCaseCharacter);
            return;
        }

        if (password !== repeatPassword){
            setWarning(warningTypes.PasswordsNotEqual);
            return;
        }
    }

    if (warning.length > 0) {
        if (warning === warningTypes.ShortPassword) warningText = warningMessages.ShortPassword;
        if (warning === warningTypes.PasswordMissingDigit) warningText = warningMessages.PasswordMissingDigit
        if (warning === warningTypes.PasswordMissingLowerCaseCharacter) warningText = warningMessages.PasswordMissingLowerCaseCharacter
        if (warning === warningTypes.PasswordMissingUpperCaseCharacter) warningText = warningMessages.PasswordMissingUpperCaseCharacter;
        if (warning === warningTypes.PasswordsNotEqual) warningText = warningMessages.PasswordsNotEqual;
        if (warning === warningTypes.ShortUsername) warningText = warningMessages.ShortUsername;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Header text="Register"/>
            <Label htmlFor="username" text="Username"/>
            <InputText type="text" id="username" name="username" value={username} onChange={handleUsernameChange} isRequired={true} maxLenght={32}/>
            <Label htmlFor="email" text="Email"/>
            <InputText type="email" id="email" name="email" value={email} onChange={handleEmailChange} isRequired={true}/>
            <Label htmlFor="password" text="Password"/>
            <InputText type="password" id="password" name="password" value={password} onChange={handlePasswordChange} isRequired={true} maxLenght={64}/>
            <Label htmlFor="repeatPassword" text="Repeat password"/>
            <InputText type="password" id="repeatPassword" name="repeatPassword" value={repeatPassword} onChange={handleRepeatPasswordChange} isRequired={true} maxLenght={64}/>
            <InputButton type="submit" value="Register"/>
            {warning ? <Warning header="Warning" text={warningText}/> : null}
        </Form>
    )
}