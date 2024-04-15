import "./UpdateProfile.css";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../app/modules/userModules";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";
import { InputProfile } from "../../common/InputProfile/InputProfile";
import { getProfileService, updateProfileWithAvatarService, updateProfileWithoutAvatarService } from "../../services/apiCalls";
import placeholderUpdateAvatar from "../../assets/placeholder_update_profile.png";

export const UpdateProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const rdxInstance = useSelector(userData)
    const userToken = (useSelector(userData)).credentials.token
    let userDataToken = (useSelector(userData)).credentials.decoded
    const imgsRoot = "https://fakebook-production-b29b.up.railway.app/api/public/"
    const [loadedUserProfile, setLoadedUserProfile] = useState(false)
    const [changesDetected, setChangesDetected] = useState("disabled")
    const [imageSrc, setImageSrc] = useState(null)
    
    const [userProfileData, setUserProfileData] = useState({
        name: "",
        avatar: ""
    })

    const [userProfilePrevData, setUserProfilePrevData] = useState({
        name: "",
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
                    name: fetched.data.name,
                    avatar: userDataToken.avatar
                })
                setUserProfilePrevData({
                    name: fetched.data.name,
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

    const handleFileChange = (e) => {
        if (e.target.files) {
            setUserProfileData({
                name: userProfileData.name,
                avatar: e.target.files[0]
            })

            const reader = new FileReader()
            reader.onload = (e) => {
                setImageSrc(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
              
        }
    }

    const updateUserData = async () => {
        try {
            let fetched
            if(userProfileData.avatar !== userProfilePrevData.avatar){
                fetched = await updateProfileWithAvatarService(userToken, userProfileData)
            } else {
                fetched = await updateProfileWithoutAvatarService(userToken, userProfileData)
            }
            console.log(fetched);
            setUserProfileData({
                name: fetched.data.name,
                avatar: fetched.data.avatar
            })
            setUserProfilePrevData({
                name: fetched.data.name,
                avatar: fetched.data.avatar
            })
            setImageSrc(null)
            dispatch(update({ credentials: { ...rdxInstance.credentials, decoded: { ...rdxInstance.credentials.user, name: fetched.data.name, avatar: fetched.data.avatar }}}))
        } catch (error) {
            console.log(error)
        }
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
                <div className="profileAvatarUpdateProfile">
                    {imageSrc ? (
                        <img className="userUpdateProfileIcon" src={imageSrc} alt="Selected Image" />
                    ) : (
                        <img className="userUpdateProfileIcon" src={placeholderUpdateAvatar} alt="Selected Image" />
                    )}
                </div>
            </div>
            <div className="linkOpenAvatarFile">
                <label htmlFor="file">Select new avatar</label>
                <input id="file" type="file" name="avatar" className="fileSelector" onChange={handleFileChange}/>
            </div>
            <div className="formUserDataToUpdate">
                <InputProfile
                    inputName="Name" 
                    type="text" 
                    name="name"
                    value={userProfileData.name || ""}
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
                <button className="saveLocalChanges" disabled={changesDetected} onClick={updateUserData}>
                    SAVE <i className="bi bi-save-fill saveButtonIcon"></i>
                </button>
            </div>
        </div>
    )
}