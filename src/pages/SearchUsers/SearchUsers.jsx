import "./SearchUsers.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";
import { getUsersAsUserService } from "../../services/apiCalls";

export const SearchUsers = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const userToken = (useSelector(userData)).credentials.token
    const userId = (useSelector(userData)).credentials.decoded.userId
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
                {listUsers.map((item) => {
                    if(item._id !== userId){
                        return (
                            <div key={item._id} className="cardUserListed">
                                <p>{item.name}</p>
                                <button className="followButton">Follow</button>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}