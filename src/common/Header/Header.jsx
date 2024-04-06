import "./Header.css";
import { useLocation } from "react-router-dom";

export const Header = () => {
    const location = useLocation()
    if(location.pathname !== "/accounts/login" && location.pathname !== "/accounts/register"){
        return (
            <div className="headerDesign">
                Im header
            </div>
        )
    }
}