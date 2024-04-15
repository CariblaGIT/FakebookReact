import "./SearchUsers.css";
import { useSelector, useDispatch } from "react-redux";
import { following } from "../../app/modules/userModules";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";
import { getUsersAsUserService, giveFollowService } from "../../services/apiCalls";

export const SearchUsers = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const rdxInstance = useSelector(userData)
    const userToken = (useSelector(userData)).credentials.token
    const userId = (useSelector(userData)).credentials.decoded.userId
    const followedUsers = (useSelector(userData)).credentials.decoded.following
    const [listUsers, setListUsers] = useState([])
    const [listUsersLoaded, setListUsersLoaded] = useState(false)

    useEffect(() => {
        if (!userToken) {
            navigate("/accounts/login")
        }
    }, [userToken])

    useEffect(() => {
        const loadListUsers = async () => {
            const fetched = await getUsersAsUserService(userToken);
            if(fetched.success){
                setListUsers(fetched.data)
                setListUsersLoaded(true)
            }
        }
        if(!listUsersLoaded){ loadListUsers() }
    }, [listUsers])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const followAction = async (userId) => {
        try {
            const fetched = await giveFollowService(userToken, userId)
            const listFollowingUsers = fetched.data.following
            const followedIds = []
            for(let i = 0; i < listFollowingUsers.length; i++){
                followedIds.push(listFollowingUsers[i]._id)
            }
            dispatch(following({ credentials: { ...rdxInstance.credentials, decoded: { ...rdxInstance.credentials.decoded, following: followedIds }}}))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="searchUsersDesign">
            <div className="searcherSection">
                <i className="bi bi-search finderIcon"></i>
                <input 
                    className="finderInput" 
                    type="text" 
                    placeholder="Find users"
                    value={search || ""}
                    onChange={e => handleSearch(e)}
                />
            </div>
            <div className="listUsersSection">
                {listUsers.map((item, index) => {
                    if(item._id !== userId){
                        return (
                            <div key={item._id} className="cardUserListed">
                                <p className="userNameListed">{item.name}</p>
                                {followedUsers.includes(item._id) ? (
                                    <button className="unfollowButton" onClick={() => followAction(item._id)}>
                                        Unfollow
                                        <i className="bi bi-person-fill-dash removeUserIcon"></i>
                                    </button>
                                ) : (
                                    <button className="followButton" onClick={() => followAction(item._id)}>
                                        Follow
                                        <i className="bi bi-person-fill-add addUserIcon"></i>
                                    </button>
                                )}
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}