import "./AdminPanel.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
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
    const [selectedEntity, setSelectedEntity] = useState("Users")
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
            setUsers(fetched.data)
            setUsersLoaded(true)
        }

        if(!usersLoaded) { getAllUsers() }
    }, [users])

    useEffect(() => {
        const getAllPosts = async () => {
            const fetched = await getAllPostsService(userToken);
            setPosts(fetched.data)
            setPostsLoaded(true)
        }

        if(!postsLoaded) { getAllPosts() }
    }, [posts])

    const logoutUser = () => {
        dispatch(logout({ credentials: "" }))
        navigate("accounts/login")
    }

    const changeView = (view) => {
        setSelectedEntity(view)
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
                <div className="selectEntityAdmin">
                    <button onClick={() => changeView("Users")} className="selectUsers">Users</button>
                    <button onClick={() => changeView("Posts")} className="selectPosts">Posts</button>
                </div>
                <div className="contentAdmin">
                    {selectedEntity === "Users" ? (
                        <Table responsive striped variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    ) : (
                        <Table responsive striped variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Owner</th>
                                    <th>Text</th>
                                    <th>Likes</th>
                                    <th>NumContent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{item.owner.name}</td>
                                                <td>{item.text}</td>
                                                <td>{(item.likes).length}</td>
                                                <td>{(item.content).length}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    )
}