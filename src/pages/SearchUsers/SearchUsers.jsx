import "./SearchUsers.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";

export const SearchUsers = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const userToken = (useSelector(userData)).credentials.token

    useEffect(() => {
        if (!userToken) {
            navigate("/accounts/login")
        }
    }, [userToken])

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

            </div>
        </div>
    )
}