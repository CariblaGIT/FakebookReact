import "./GoogleButton.css"
import googleIcon from "../../assets/google-icon.png"

export const GoogleButton = () => {
    return (
        <button className="google-signin-btn">
            <img className="google-signin-icon" src={googleIcon}/>
            Sign in with Google
        </button>
    )
}