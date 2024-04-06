import "./Timeline.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";

export const Timeline = () => {
    const navigate = useNavigate()
    const userLogged = useSelector(userData);

    useEffect(() => {
        if (!userLogged.credentials.token) {
            navigate("/accounts/login");
        }
    }, [userLogged]);
    
    return (
        <div className="timelineDesign">
            Im the timeline
        </div>
    )
}