import "./Login.css";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../app/modules/userModules";
import { loginService } from "../../services/apiCalls";
import { InputAuth } from "../../common/InputAuth/InputAuth";
import { ButtonAuth } from "../../common/ButtonAuth/ButtonAuth";
import { GoogleButton } from "../../common/GoogleButton/GoogleButton";

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)
    const [msgSuccess, setMsgSuccess] = useState("")
    const [notAllowToLogin, setNotAllowToLogin] = useState(true)

    const [credentials, setCredentials] = useState({
        email : "",
        password : ""
    })

    useEffect(() => {
        if(credentials.email !== "" && credentials.password !== ""){
            setNotAllowToLogin(false)
        } else {
            setNotAllowToLogin(true)
        }
    }, [credentials])

    const registerRedirect = () => {
        navigate("/accounts/register")
    }

    const loginCredentialsHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const loginUserCall = async () => {
        try {
            const fetched = await loginService(credentials)
            if(fetched.success === false){
                throw new Error("Invalid credentials")
            }
            setSuccess(true)
            const decodedToken = decodeToken(fetched.token)

            const passport = {
                token: fetched.token,
                decoded: decodedToken,
            }

            setMsgSuccess("")
            dispatch(login({ credentials: passport }))
        } catch (error) {
            setSuccess(false)
            setMsgSuccess(error.message)
        }
    }

    return (
        <div className="loginDesign">
            <div className="gifLogin">
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2E1Ynl0anlqOGtod2tkMzlveGZocHdxbDY5aW0zcmdncGk0dW1iMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7aDd4hAEcciOzcVW/giphy.gif"/>
            </div>
            <div>
            <div className="loginForm">
                <h1 className="appName">Fakebook</h1>
                <InputAuth 
                    className={"inputAuthForm"} 
                    type={"email"}
                    name={"email"}
                    value={credentials.email || ""} 
                    placeholder={"User or email"}
                    onChange={e => loginCredentialsHandler(e)}
                />
                <InputAuth
                    className={"inputAuthForm"} 
                    type={"password"}
                    name={"password"}
                    value={credentials.password || ""} 
                    placeholder={"Password"}
                    onChange={e => loginCredentialsHandler(e)}
                />
                <ButtonAuth
                    className={"buttonAuthDesign"}
                    buttonText={"Login"}
                    onClickFunction={loginUserCall}
                    disabled={notAllowToLogin}
                />
                <div className={(!success ? "loginError" : "loginSuccess")}>{msgSuccess}</div>
                <div className="lineLogin"/>
                <GoogleButton/>
                <div className="forgetPassword">
                    <a className="registerLink">Do you forget your password?</a>
                </div>
            </div>
            <div className="registerContent">
                <p className="registerText">You do not have an account?</p> <a className="registerLink" onClick={registerRedirect}>Register</a>
            </div>
            </div>
        </div>
    )
}