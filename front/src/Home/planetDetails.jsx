import {useState,useContext} from "react";
import { IoClose } from "react-icons/io5";
import 'react-medium-image-zoom/dist/styles.css'
// Assets
import GallEarth1 from "../assets/gal-earth1.jpg"
import GallEarth2 from "../assets/gal-earth2.jpg"
import GallEarth3 from "../assets/gal-earth3.jpg"
import GallEarth4 from "../assets/gal-earth4.jpg"
import { UserContext } from "../context/UserContext";

const commentsData = [{
    id: 1,
    name: "Monica",
    time: "1h ago",
    avatar: "https://via.placeholder.com/50", // Placeholder for avatar image
    comment:
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
},
{
    id: 2,
    name: "Larry G",
    time: "2 days ago",
    avatar: "https://via.placeholder.com/50",
    comment: "Awesome!",
},
{
    id: 3,
    name: "Johny",
    time: "May, 30",
    avatar: "https://via.placeholder.com/50",
    comment:
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
},
];

const Home = ({setNavStatus,navStatus,planet}) => {
    const { user } = useContext(UserContext);
    const [comment, setComment] = useState('');

    const handleAddComment = async (e) => {
        let userId = user._id;
        let username = user.username;
        let planetId = planet._id;
        
        try{
            const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/planet/addComment`,{userId,username,comment,planetId});
            console.log(res);
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div className={`planet_details_window ${navStatus ? 'showIt' : ''}`}>
            <div className="close" onClick={e=>setNavStatus(false)}>
                <IoClose />
            </div>
            <div className="details_content">
                <div className="infos">
                    <h1>{planet?.name}</h1>
                    <p>{planet?.description}</p>
                </div>
                <div className="galleries">
                    {planet?.gallery.map((img,idx)=>{
                        return(
                            <div className="gall" key={idx}>
                                <img src={img} alt="planet" />
                            </div>
                        )
                    })}
                </div>
                <div className="videos">
                    {planet?.videos.map((vid,idx) => (
                        <div className="video" key={idx}>
                            <iframe width="560" height="315" src={vid} title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                    ))}
                </div>
                <div className="comments-container">
                    <h2>Comments</h2>
                    <div className="add-comment">
                        <textarea
                            placeholder="Write a comment..."
                            className="comment-input"
                            value={comment}
                            onChange={e=>setComment(e.target.value)}
                          ></textarea>
                        <button onClick={()=>handleAddComment()} className="add-comment-btn">Post Comment</button>
                    </div>
                    {commentsData.map((comment) => (
                        <div key={comment.id} className="comment">
                        <img src={comment.avatar} alt={`${comment.name}'s avatar`} className="avatar" />
                        <div className="comment-content">
                            <div className="comment-header">
                            <h4>{comment.name}</h4>
                            <span className="time">{comment.time}</span>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                        </div>
                    ))}
                    </div>
            </div>
        </div>
    )
}
export default Home;