import "./PostCard.css";

export const PostCard = ({post}) => {
    const imgsRoot = "https://fakebook-production-b29b.up.railway.app/api/public/"
    const arrayContent = post.content
    return (
        <div key={post._id} className="postCard">
            <div className="postCardHeader">
                <img className="userIcon" src={`${imgsRoot}avatar/${post.owner.avatar}`}/>
                <div className="userName">{post.owner.name}</div>
            </div>
            <div className="postContent">
                {arrayContent.map((item, index) => {
                    return (
                        <img key={index} className="postContentImgs" src={item}/>
                    )
                })}
            </div>
            <div className="postInteractions">
                <div className="buttonsInteractions">
                    <i className="bi bi-heart likeIcon"></i>
                    <i className="bi bi-chat commentIcon"></i>
                </div>
            </div>
            <div className="postData">
                <div className="postLikes">
                    <p>{post.likes.length} likes</p>
                </div>
                <div className="postText">
                    <p><b>{post.owner.name}</b> {post.text}</p>
                </div>
            </div>
        </div>
    )
}