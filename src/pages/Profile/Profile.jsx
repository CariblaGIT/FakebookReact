import "./Profile.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";

export const Profile = () => {
    const userToken = (useSelector(userData)).credentials.token

    useEffect(() => {
        if (!userToken) {
            navigate("/accounts/login")
        }
    }, [userToken])
    
    return (
        <div className="profileDesign">
            Im on the profile
        </div>
    )
}