import "./Profile.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";
import { getProfileService } from "../../services/apiCalls";

export const Profile = () => {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({})
    const [loadedUserProfile, setLoadedUserProfile] = useState(false)
    const userToken = (useSelector(userData)).credentials.token
    const userDataToken = (useSelector(userData)).credentials.decoded
    const imgsRoot = "https://fakebook-production-b29b.up.railway.app/api/public/"

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
                setUserProfile(fetched.data)
            } catch (error) {
                console.log(error)
            }
        }

        if(!loadedUserProfile) { getUserProfileData() }
    }, [userProfile])

    return (
        <div className="profileDesign">
            <div className="userProfileData">
                <div className="profileAvatar">
                    <img className="userProfileIcon" src={`${imgsRoot}avatar/${userDataToken.avatar}`}/>
                    <p className="resaltedData">{userDataToken.username}</p>
                </div>
                <div className="profileInteractionsData">
                    <div className="postsData">
                        <p className="resaltedData">0</p>
                        <p>posts</p>
                    </div>
                    <div className="followersData">
                        <p className="resaltedData">{userProfile.followers.length}</p>
                        <p>followers</p>
                    </div>
                    <div className="followingData">
                        <p className="resaltedData">{userProfile.following.length}</p>
                        <p>following</p>
                    </div>
                </div>
            </div>
            <div className="profileInteractions">
                <button className="buttonsProfileInteracions">Edit profile</button>
                <button className="buttonsProfileInteracions">Share</button>
            </div>
            <div className="profileOwnPosts">
                Make posts to shown it here
            </div>
        </div>
    )
}