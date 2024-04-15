import "./Register.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../../services/apiCalls";
import { InputAuth } from "../../common/InputAuth/InputAuth";
import { ButtonAuth } from "../../common/ButtonAuth/ButtonAuth";
import { validateRegisterData } from "../../utils/userDataValidation";

export const Register = () => {
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)
    const [msgSuccess, setMsgSuccess] = useState("")
    const [notAllowToRegister, setNotAllowToRegister] = useState(true)

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        passwordError: ""
    })

    useEffect(() => {
        if(user.name !== "" && user.email !== "" && user.password !== ""){
            console.log("Not empty");
            console.log(userError);
            if((userError.nameError === undefined || "") && 
            (userError.emailError === undefined || "") && 
            (userError.passwordError === undefined || "")){
                console.log("hello");
                setNotAllowToRegister(false)
            } else {
                setNotAllowToRegister(true)
            }
        } else {
            setNotAllowToRegister(true)
        }
    }, [user])

    const loginRedirect = () => {
        navigate("/accounts/login")
    }

    const registerInputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))

        const error = validateRegisterData(e.target.name, e.target.value);
    
        if(error !== "No error"){
            setUserError((prevState) => ({
                ...prevState,
                [e.target.name + "Error"]: error
            }))
        }
    }

    const registerUserCall = async () => {
        try {
            const fetched = await registerService(user)
            if(fetched.success === false){
                throw new Error(fetched.error)
            }
            setSuccess(true)
            setMsgSuccess(fetched.message + "\n" + "Redirecting to Login")
            setTimeout(() => {
                navigate("/accounts/login")
              }, 2000);
        } catch (error) {
            setMsgSuccess(error.message)
        }
    }

    return (
        <div className="registerDesign">
            <div className="registerForm">
                <h1 className="appNameRegister">Fakebook</h1>
                <p className="subHeaderRegister">Register to see photos and videos of your friends</p>
                <div className="lineRegister"/>
                <InputAuth 
                    className={"inputAuthForm"} 
                    type={"text"}
                    name={"name"}
                    value={user.name || ""} 
                    placeholder={"Username"}
                    onChange={e => registerInputHandler(e)}
                />
                <div className="inputError">{userError.nameError}</div>
                <InputAuth 
                    className={"inputAuthForm"} 
                    type={"email"}
                    name={"email"}
                    value={user.email || ""} 
                    placeholder={"Email"}
                    onChange={e => registerInputHandler(e)}
                />
                <div className="inputError">{userError.emailError}</div>
                <InputAuth
                    className={"inputAuthForm"} 
                    type={"password"}
                    name={"password"}
                    value={user.password || ""} 
                    placeholder={"Password"}
                    onChange={e => registerInputHandler(e)}
                />
                <div className="inputError">{userError.passwordError}</div>
                <p className="politicsText">When you login, you accept our Conditions. Get more info on the Privacy Politics about 
                    how we get, use and share your data, as well as about our use of cookies and similar technologies 
                    on the Cookies Politics.</p>
                <ButtonAuth
                    className={"buttonAuthDesign"}
                    buttonText={"Register"}
                    onClickFunction={registerUserCall}
                    disabled={notAllowToRegister}
                />
                <div className={(!success ? "registerError" : "registerSuccess")}>{msgSuccess}</div>
            </div>
            <div className="loginContent">
                <p className="loginText">Do you have an account?</p> <a className="loginLink" onClick={loginRedirect}>Login</a>
            </div>
        </div>
    )
}