import "./UpdateProfile.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";
import { InputProfile } from "../../common/InputProfile/InputProfile";
import { getProfileService } from "../../services/apiCalls";

export const UpdateProfile = () => {
    const navigate = useNavigate()
    const userToken = (useSelector(userData)).credentials.token
    const userDataToken = (useSelector(userData)).credentials.decoded
    const imgsRoot = "https://fakebook-production-b29b.up.railway.app/api/public/"
    const [loadedUserProfile, setLoadedUserProfile] = useState(false)
    const [changesDetected, setChangesDetected] = useState("disabled")
    
    const [userProfileData, setUserProfileData] = useState({
        user: "",
        avatar: ""
    })

    const [userProfilePrevData, setUserProfilePrevData] = useState({
        user: "",
        avatar: ""
    })

    useEffect(() => {
        if (!userToken) {
            navigate("/accounts/login")
        }
    }, [userToken])

    useEffect(() => {
        const getUserProfileData = async () => {
            try {
                const fetched = await getProfileService(userToken)
                setLoadedUserProfile(true)
                setUserProfileData({
                    user: fetched.data.name,
                    avatar: userDataToken.avatar
                })
                setUserProfilePrevData({
                    user: fetched.data.name,
                    avatar: userDataToken.avatar
                })
            } catch (error) {
                console.log(error)
            }
        }

        if(!loadedUserProfile) { getUserProfileData() }
    }, [userProfileData])

    useEffect(() => {
        if(JSON.stringify(userProfileData) !== JSON.stringify(userProfilePrevData)){
            setChangesDetected("")
        } else {
            setChangesDetected("disabled")
        }
    }, [userProfileData, userProfilePrevData])

    const backToProfile = () => {
        navigate("/profile")
    }

    const detectChanges = (e) => {
        setUserProfileData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
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
                <InputProfile
                    inputName="Name" 
                    type="text" 
                    name="user"
                    value={userProfileData.user || ""}
                    placeholder="Write your username"
                    onChange={e => detectChanges(e)}
                />
                <InputProfile
                    inputName="Description" 
                    type="text" 
                    name="description"
                    value="lorem ipsum dolor sit amen"
                    placeholder="Write a bio"
                    disabled="disabled"
                />
                <button className="saveLocalChanges" disabled={changesDetected}>
                    SAVE <i className="bi bi-save-fill saveButtonIcon"></i>
                </button>
            </div>
        </div>
    )
}