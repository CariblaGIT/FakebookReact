import "./PostCard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../app/modules/userModules";
import { givingLikesService } from "../../services/apiCalls";

export const PostCard = ({post}) => {
    const imgsRoot = "https://fakebook-production-b29b.up.railway.app/api/public/"
    const userId = (useSelector(userData)).credentials.decoded.userId
    const userToken = (useSelector(userData)).credentials.token
    const arrayContent = post.content
    const [isLiked, setIsLiked] = useState(false)
    let arrayLikes = post.likes

    useEffect(() => {
        for(let i = 0; i < arrayLikes.length; i++){
            if(arrayLikes[i]._id === userId){
                setIsLiked(true)
            }
        }
    }, [isLiked])

    const likeInteraction = async (postId) => {
        try {
            const fetched = await givingLikesService(userToken, postId)
            if(fetched.success){
                if(isLiked === true){
                    setIsLiked(false)
                    arrayLikes.filter(item => item !== userId)
                } else {
                    setIsLiked(true)
                    arrayLikes.push(userId)
                }
            }
        } catch (error) {
            console.log(error) 
        }
    }

    const commentInteraction = () => {
        console.log("Commenting");
    }

    return (
        <div key={post._id} className="postCard">
            <div className="postCardHeader">
                <img className="userIcon" src={`${imgsRoot}avatar/${post.owner.avatar}`}/>
                <div className="userName">{post.owner.name}</div>
            </div>
            <div className="postContent">
                {arrayContent.map((item, index) => {
                    return (
                        <img key={index} className="postContentImgs" src={`${imgsRoot}post/${item}`}/>
                    )
                })}
            </div>
            <div className="postInteractions">
                <div className="buttonsInteractions">
                    <i onClick={() => likeInteraction(post._id)} className={`bi bi-heart${isLiked ? "-fill likedIcon" : " likeIcon"}`}></i>
                    <i onClick={commentInteraction} className="bi bi-chat commentIcon"></i>
                </div>
            </div>
            <div className="postData">
                <div className="postLikes">
                    <p>{arrayLikes.length} likes</p>
                </div>
                <div className="postText">
                    <p><b>{post.owner.name}</b> {post.text}</p>
                </div>
            </div>
        </div>
    )
}