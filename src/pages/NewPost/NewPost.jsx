import "./NewPost.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";
import { makePostService } from "../../services/apiCalls";

export const NewPost = () => {
    const navigate = useNavigate()
    const userToken = (useSelector(userData)).credentials.token
    const [imageSrc, setImageSrc] = useState(null)
    const [allowToPost, setAllowToPost] = useState("disabled")
    const [post, setPost] = useState({
        text: "",
        post: ""
    })

    useEffect(() => {
        if (!userToken) {
            navigate("/accounts/login")
        }
    }, [userToken])

    useEffect(() => {
        if(post.text !== "" && post.post !== ""){
            setAllowToPost("")
        } else {
            setAllowToPost("disabled")
        }
    }, [post])

    const backToTimeline = () => {
        navigate("/timeline")
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setPost({
                text: post.text,
                post: e.target.files[0]
            })

            const reader = new FileReader()
            reader.onload = (e) => {
                setImageSrc(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
              
        }
    }

    const handlePostChange = (e) => {
        setPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const postNewPost = async () => {
        const fetched = await makePostService(userToken, post)
        if(fetched.success === true){
            navigate("/timeline")
        }
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
                        <>
                            <label htmlFor="file">Select post image</label>
                            <input id="file" type="file" name="post" className="fileSelector" onChange={handleFileChange}/>
                        </>
                    ) : (
                        <img className="contentImgPost" src={imageSrc} alt="Selected Image"/>
                    )}
                </div>
            </div>
            <div className="descriptionNewPost">
                <textarea 
                    className="descriptionAreaNewPost" 
                    placeholder="Write your description" 
                    name="text"
                    value={post.text || ""}
                    onChange={e => handlePostChange(e)}
                />
            </div>
            <div className="actionsNewPost">
                <button disabled={allowToPost} className="buttonAddNewPost" onClick={postNewPost}>Add Post</button>
            </div>
        </div>
    )
}