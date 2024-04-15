import "./Header.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../app/modules/userModules";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const locations = ["/timeline", "/profile", "/search"]

    const logoutUser = () => {
        dispatch(logout({ credentials: "" }))
        navigate("accounts/login")
    }

    if(locations.includes(location.pathname)){
        return (
            <div className="headerDesign">
                <div className="appNameHeader">
                    <h3>Fakebook</h3>
                </div>
                <div className="userInteractions">
                    <i className="bi bi-star favouritesIcon"></i>
                    <i onClick={logoutUser} className="bi bi-box-arrow-left privatesIcon"></i>
                </div>
            </div>
        )
    }
}