import "./Header.css";
import { useLocation } from "react-router-dom";

export const Header = () => {
    const location = useLocation()
    const locations = ["/timeline", "/profile"]
    if(locations.includes(location.pathname)){
        return (
            <div className="headerDesign">
                <div className="appNameHeader">
                    <h3>Fakebook</h3>
                </div>
                <div className="userInteractions">
                    <i className="bi bi-star favouritesIcon"></i>
                    <i className="bi bi-send privatesIcon"></i>
                </div>
            </div>
        )
    }
}