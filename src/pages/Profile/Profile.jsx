import "./Profile.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";
import { getOwnPostsService, getProfileService } from "../../services/apiCalls";

export const Profile = () => {
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState({
        name: "",
        email: "",
        followers: [],
        following: []
    })
    const [userPosts, setUserPosts] = useState([])
    const [loadedUserProfile, setLoadedUserProfile] = useState(false)
    const [loadedUserPosts, setLoadedUserPosts] = useState(false)
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

    useEffect(() => {
        const getUserPostsData = async () => {
            try {
                const fetched = await getOwnPostsService(userToken)
                setLoadedUserPosts(true)
                setUserPosts(fetched.data)
            } catch (error) {
                console.log(error)
            }
        }

        if(!loadedUserPosts) { getUserPostsData() }
    }, [userPosts])

    return (
        <div className="profileDesign">
            <div className="userProfileData">
                <div className="profileAvatar">
                    <img className="userProfileIcon" src={`${imgsRoot}avatar/${userDataToken.avatar}`}/>
                    <p className="resaltedData">{userDataToken.username}</p>
                </div>
                <div className="profileInteractionsData">
                    <div className="postsData">
                        <p className="resaltedData">{userPosts.length || 0}</p>
                        <p>posts</p>
                    </div>
                    <div className="followersData">
                        <p className="resaltedData">{userProfile.followers.length || 0}</p>
                        <p>followers</p>
                    </div>
                    <div className="followingData">
                        <p className="resaltedData">{userProfile.following.length || 0}</p>
                        <p>following</p>
                    </div>
                </div>
            </div>
            <div className="profileInteractions">
                <button className="buttonsProfileInteracions">Edit profile</button>
                <button className="buttonsProfileInteracions">Share</button>
            </div>
                {!userPosts.length ? (
                    <div className="profileNoOwnPosts">
                        Make posts to shown it here
                    </div>
                ) : (
                    <div className="profileOwnPosts">
                        {userPosts.map(item => {
                            return (
                                <div key={item._id} className="postCardView">
                                    <img className="postPreviewImg" src={item.content[0]}/>
                                </div>
                            )
                        })}
                    </div>
                )}
        </div>
    )
}