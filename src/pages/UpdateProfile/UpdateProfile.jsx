import "./UpdateProfile.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";

export const UpdateProfile = () => {
    const navigate = useNavigate()
    const userToken = (useSelector(userData)).credentials.token
    const userDataToken = (useSelector(userData)).credentials.decoded
    const imgsRoot = "https://fakebook-production-b29b.up.railway.app/api/public/"

    useEffect(() => {
        if (!userToken) {
            navigate("/accounts/login")
        }
    }, [userToken])

    const backToProfile = () => {
        navigate("/profile")
    }

    return (
        <div className="updateProfileDesign">
            <div className="headerUpdateProfile">
                <i onClick={() => backToProfile()} className="bi bi-arrow-left arrowIconUpdateProfile"></i>
                <h4 className="headerUpdateProfileText">Edit profile</h4>
            </div>
            <div className="avatarsSectionUpdateProfile">
                <div className="profileIconUpdateProfile">
                    <img className="userUpdateProfileIcon" src={`${imgsRoot}avatar/${userDataToken.avatar}`}/>
                </div>
                <div className="profileAvatarUpdateProfile"></div>
            </div>
            <div className="linkOpenAvatarFile">
                <a>Select avatar file</a>
            </div>
            <div className="formUserDataToUpdate">
                
            </div>
        </div>
    )
}