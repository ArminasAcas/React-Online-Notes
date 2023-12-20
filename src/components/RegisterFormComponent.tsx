import "../css/RegisterFormComponent.css"

export default function RegisterForm() {
    return (
        <div className="register">
            <form className="register__form">
                <h1 className="register__header">Register</h1>
                <label className="register__label" htmlFor="username">Username</label>
                <input className="register__text-input" type="text" id="username" name="username"></input>
                <label className="register__label" htmlFor="email">Email</label>
                <input className="register__text-input" type="email" id="email" name="email"></input>
                <label className="register__label" htmlFor="password">Password</label>
                <input className="register__text-input" type="password" id="password" name="password"></input>
                <label className="register__label" htmlFor="repeatPassword">Repeat password</label>
                <input className="register__text-input" type="repeatPassword" id="repeatPassword" name="repeatPassword"></input>
                <input className="register__button" type="submit" value="Register"></input>
             </form>
        </div>   
    )
}