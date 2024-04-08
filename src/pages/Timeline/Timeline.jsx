import "./Timeline.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/modules/userModules";
import { timelineService } from "../../services/apiCalls";
import { PostCard } from "../../common/PostCard/PostCard";

export const Timeline = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const userToken = (useSelector(userData)).credentials.token
    const [loadedPosts, setLoadedPosts] = useState(false)

    // useEffect(() => {
    //     console.log(posts);
    // }, [posts])

    useEffect(() => {
        if (!userToken) {
            navigate("/accounts/login")
        }
    }, [userToken])

    useEffect(() => {
        const getUserTimeline = async () => {
            try {
                const fetched = await timelineService(userToken)
                setLoadedPosts(true)
                setPosts(fetched.data)
            } catch (error) {
                console.log(error)
            }
        }
    
        if (!loadedPosts) { getUserTimeline() }
    }, [posts])
    
    return (
        <div className="timelineDesign">
            {posts.map(item => {
                return (
                    <PostCard post={item}/>
                )
            })}
        </div>
    )
}