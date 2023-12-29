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
    const [registrationSuccess, setRegistrationSuccess] = useState(0);
    const [registrationMessage, setRegistrationMessage] = useState("");
    let informationText = "";

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

        const FormData =
        {
            username: username,
            email: email,
            password: password,
            repeatPassword: repeatPassword
        };

        try
        {
            fetch
            (
                "http://localhost:3500/api/register",
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json"},
                    body: JSON.stringify({FormData})
                }
            )
            .then(async (res) => {
                if (res.ok) {
                    const response = await res.json();
                    const {success, message} = response;

                    setRegistrationMessage(message);
                    success === 1 ? setRegistrationSuccess(1) : setRegistrationSuccess(2);
                }
            })
            .catch(() => {
                setRegistrationSuccess(3);
                setRegistrationMessage("Error! looks like there was a mistake.");
            })
        }
        catch{
            setRegistrationSuccess(3);
            setRegistrationMessage("Error! looks like there was a mistake.");
        }
    }

    if (warning.length > 0) {
        if (warning === warningTypes.ShortPassword) informationText = warningMessages.ShortPassword;
        if (warning === warningTypes.PasswordMissingDigit) informationText = warningMessages.PasswordMissingDigit
        if (warning === warningTypes.PasswordMissingLowerCaseCharacter) informationText = warningMessages.PasswordMissingLowerCaseCharacter
        if (warning === warningTypes.PasswordMissingUpperCaseCharacter) informationText = warningMessages.PasswordMissingUpperCaseCharacter;
        if (warning === warningTypes.PasswordsNotEqual) informationText = warningMessages.PasswordsNotEqual;
        if (warning === warningTypes.ShortUsername) informationText = warningMessages.ShortUsername;
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
            {warning ? <Warning header="Warning" text={informationText}/> : null}
            {registrationSuccess > 0 ? <Warning text={registrationMessage}/> : null}
        </Form>
    )
}