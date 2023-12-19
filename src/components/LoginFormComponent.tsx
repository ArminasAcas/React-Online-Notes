import "../css/LoginFormComponent.css"

export default function LoginForm() {
    return (
        <div className="login">
            <form className="login__form">
                <h1 className="login__header">Login</h1>
                <label className="login__label" htmlFor="username">Username</label>
                <input className="login__text-input" type="text" id="username" name="username"></input>
                <label className="login__label" htmlFor="password">Password</label>
                <input className="login__text-input" type="password" id="password" name="password"></input>
                <input className="login__button" type="submit" value="Log in"></input>
             </form>
        </div>   
    )
}