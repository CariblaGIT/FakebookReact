import "./NewPost.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";

export const NewPost = () => {
    const navigate = useNavigate()
    const userToken = (useSelector(userData)).credentials.token

    useEffect(() => {
        if (!userToken) {
            navigate("/accounts/login")
        }
    }, [userToken])

    const backToTimeline = () => {
        navigate("/timeline")
    }

    return (
        <div className="newPostDesign">
            <div className="headerUpdateProfile">
                <i onClick={() => backToTimeline()} className="bi bi-arrow-left arrowIconUpdateProfile"></i>
                <h4 className="headerUpdateProfileText">New Post</h4>
            </div>
        </div>
    )
}