import "../css/LoginFormComponent.css"
import Label from "./LabelComponent"
import InputText from "./InputTextComponent"
import InputButton from "./InputButtonComponent"
import Form from "./FormComponent"
import Header from "./HeaderComponent"
import { useState } from "react"
import InformationBox from "./InformationTextComponent"
import { LoginMessages } from "../global/textData"
import { loginStatusTypes } from "../global/variables"
import { informationTypes } from "../global/variables"
import { Navigate } from "react-router-dom"

export default function LoginForm() {

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginSatus, setLoginStatus] = useState("");
    let infoText = "";
    let infoHeader = "";
    let infoType = "";

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const FormData = {
                username: username,
                password: password
            }

            fetch(
                "http://localhost:3500/api/login", 
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json"},
                    body: JSON.stringify({FormData})
                }
            )
            .then ( async (res) => {
                if (res.status === 200) {
                    const response = await res.json();
                    const {token, expiresIn} = response;
                    localStorage.setItem("userToken", JSON.stringify({token, expiresIn}));
                }
                else if (res.status === 401) {
                    setLoginStatus(loginStatusTypes.incorrectCredentials);
                }
                else {
                    setLoginStatus(loginStatusTypes.error);
                }
            })
        }
        catch {
            setLoginStatus(loginStatusTypes.error);
        }
    }

    if (loginSatus === loginStatusTypes.incorrectCredentials) {
        infoHeader = LoginMessages.incorrectCredentials.header;
        infoText = LoginMessages.incorrectCredentials.text;
        infoType = informationTypes.error;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Header text="Login"/>
            <Label htmlFor="username" text="Username" />
            <InputText type="text" id="username" name="username" value={username} onChange={handleUsernameChange} isRequired={true}/>
            <Label htmlFor="password" text="Password" />
            <InputText type="password" id="password" name="password" value={password} onChange={handlePasswordChange} isRequired={true}/>
            <InputButton type="submit" value="Log in" />
            {loginSatus.length > 0 ? <InformationBox header={infoHeader} text={infoText} type={infoType}></InformationBox> : null}
        </Form>
    )
}