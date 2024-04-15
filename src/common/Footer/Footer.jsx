import './Footer.css';
import { useLocation, useNavigate } from "react-router-dom";

export const Footer = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const locations = ["/timeline", "/profile", "/search"]

    const navigateToTimeline = () => {
        navigate("/timeline")
    }

    const navigateToProfile = () => {
        navigate("/profile")
    }

    const navigateToSearch = () => {
        navigate("/search")
    }

    const navigateToNewPost = () => {
        navigate("/post/create")
    }

    if(locations.includes(location.pathname)){
        return (
            <footer className="footerDesign">
                <div className="section" onClick={location.pathname !== "/timeline" ? navigateToTimeline : undefined}>
                    <i className={`bi bi-house homeIcon ${location.pathname === "/timeline" ? "selected" : ""}`}></i>
                </div>
                <div className="section" onClick={navigateToNewPost}>
                    <i className="bi bi-plus-square postIcon"></i>
                </div>
                <div className="section" onClick={location.pathname !== "/search" ? navigateToSearch : undefined}>
                    <i className={`bi bi-search searchIcon ${location.pathname === "/search" ? "selected" : ""}`}></i>
                </div>
                <div className="section" onClick={location.pathname !== "/profile" ? navigateToProfile : undefined}>
                    <i className={`bi bi-person-circle profileIcon ${location.pathname === "/profile" ? "selected" : ""}`}></i>
                </div>
            </footer>
        )
    }
}