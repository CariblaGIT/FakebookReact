import './Footer.css';
import { useLocation, useNavigate } from "react-router-dom";

export const Footer = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const navigateToTimeline = () => {
        navigate("/timeline")
    }

    if(location.pathname !== "/accounts/login" && location.pathname !== "/accounts/register"){
        return (
            <footer className="footerDesign">
                <div className="section" onClick={location.pathname !== "/timeline" ? () => navigateToTimeline : () => console.log("Im on timeline")}>
                    <i className={`bi bi-house homeIcon ${location.pathname === "/timeline" ? "selected" : ""}`}></i>
                </div>
                <div className="section">
                    <i className="bi bi-plus-square postIcon"></i>
                </div>
                <div className="section">
                    <i className={`bi bi-search searchIcon ${location.pathname === "/search" ? "selected" : ""}`}></i>
                </div>
                <div className="section">
                    <i className={`bi bi-person-circle profileIcon ${location.pathname === "/profile" ? "selected" : ""}`}></i>
                </div>
            </footer>
        )
    }
}