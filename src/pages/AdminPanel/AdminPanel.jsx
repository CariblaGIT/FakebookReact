import "./AdminPanel.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/modules/userModules";
import { userData } from "../../app/modules/userModules";
import { getAllPostsService, getUsersAsAdminService } from "../../services/apiCalls";

export const AdminPanel = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [usersLoaded, setUsersLoaded] = useState(false)
    const [posts, setPosts] = useState([])
    const [postsLoaded, setPostsLoaded] = useState(false)
    const userToken = (useSelector(userData)).credentials.token
    const userDecodedToken = (useSelector(userData)).credentials.decoded

    useEffect(() => {
        if (!userToken || userDecodedToken.roleName !== "super_admin") {
            navigate("/accounts/login")
        }
    }, [userToken])

    useEffect(() => {
        const getAllUsers = async () => {
            const fetched = await getUsersAsAdminService(userToken);
            console.log(fetched);
            setUsers(fetched.data)
            setUsersLoaded(true)
        }

        if(!usersLoaded) { getAllUsers() }
    }, [users])

    useEffect(() => {
        const getAllPosts = async () => {
            const fetched = await getAllPostsService(userToken);
            console.log(fetched);
            setPosts(fetched.data)
            setPostsLoaded(true)
        }

        if(!postsLoaded) { getAllPosts() }
    }, [posts])

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