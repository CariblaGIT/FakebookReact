import "./AdminPanel.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/modules/userModules";
import { userData } from "../../app/modules/userModules";

export const AdminPanel = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userToken = (useSelector(userData)).credentials.token
    const userDecodedToken = (useSelector(userData)).credentials.decoded

    useEffect(() => {
        if (!userToken || userDecodedToken.roleName !== "super_admin") {
            navigate("/accounts/login")
        }
    }, [userToken])

    const logoutUser = () => {
        dispatch(logout({ credentials: "" }))
        navigate("accounts/login")
    }

    return (
        <div className="adminPanelDesign">
            <div className="headerDesign">
                <div className="adminPanelHeader">
                    <h3>Admin Panel</h3>
                </div>
                <div className="userInteractions">
                    <i onClick={logoutUser} className="bi bi-box-arrow-left privatesIcon"></i>
                </div>
            </div>
            <div className="adminContent">
                Content
            </div>
        </div>
    )
}