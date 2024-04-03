import "./Header.css";
import { useLocation } from "react-router-dom";

export const Header = () => {
    const location = useLocation()
    if(location.pathname !== "/" && location.pathname !== "/register"){
        return (
            <div className="headerDesign">
                Im header
            </div>
        )
    }
}