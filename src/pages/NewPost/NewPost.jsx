import "./NewPost.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";

export const NewPost = () => {
    const navigate = useNavigate()
    const userToken = (useSelector(userData)).credentials.token
    const [imageSrc, setImageSrc] = useState(null)

    useEffect(() => {
        if (!userToken) {
            navigate("/accounts/login")
        }
    }, [userToken])

    const backToTimeline = () => {
        navigate("/timeline")
    }

    return (
        <div className="newPostDesign">
            <div className="headerNewPost">
                <i onClick={() => backToTimeline()} className="bi bi-arrow-left arrowIconNewPost"></i>
                <h4 className="headerNewPostText">New Post</h4>
            </div>
            <div className="contentNewPost">
                <div className="contentSelector">
                    {imageSrc === null ? (
                        <>Select an image</>
                    ) : (
                        <img className="contentImgPost" src={imageSrc} alt="Selected Image"/>
                    )}
                </div>
            </div>
            <div className="descriptionNewPost">
                <textarea className="descriptionAreaNewPost" placeholder="Write your description" name="description" id="description" cols="30" rows="10"></textarea>
            </div>
            <div className="actionsNewPost">
                <button className="buttonAddNewPost">Add Post</button>
            </div>
        </div>
    )
}