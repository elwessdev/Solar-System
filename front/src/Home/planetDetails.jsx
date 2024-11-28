import {useState,useContext, useEffect} from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
// Assets
// import GallEarth1 from "../assets/gal-earth1.jpg"
// import GallEarth2 from "../assets/gal-earth2.jpg"
// import GallEarth3 from "../assets/gal-earth3.jpg"
// import GallEarth4 from "../assets/gal-earth4.jpg"
import { UserContext } from "../context/UserContext";

const Home = ({setNavStatus,navStatus,planet,setDe}) => {
    const { user } = useContext(UserContext);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [warning, setWarning] = useState();

    const handleAddComment = async () => {
        if(comment){
            let userID = user._id;
            let username = user.username;
            let planetID = planet._id;
            try{
                const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/planet/addComment`,{userID,username,comment,planetID});
                if(res.data.success){
                    getComments();
                    setComment('');
                    setWarning(true);
                    setTimeout(()=>{
                        setWarning(false);
                    },2000);
                } else {
                    console.log(res.data.error);
                }
            } catch(error){
                console.log(error)
            }
        }
    }
    const getComments = async () => {
        try{
            const res = await axios.get(`${import.meta.env.VITE_BACK_LINK}/planet/getCommentsById/?planetID=${planet._id}`);
            if(res.data.comments){
                setComments(res.data.comments);
            } else {
                console.log(res.data.error);
            }
        } catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getComments();
    },[])

    return(
        <div className={`planet_details_window ${navStatus ? 'showIt' : ''}`}>
            <div className="close" onClick={()=>{
                setDe();
                setNavStatus(false);
            }}>
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
                                <Zoom>
                                    <img src={img} alt="planet" />
                                </Zoom>
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
                        {warning && <p className="warning">Your comment under review before post</p>}
                        <textarea
                            placeholder="Write a comment..."
                            className="comment-input"
                            value={comment}
                            onChange={e=>setComment(e.target.value)}
                        ></textarea>
                        <button onClick={()=>handleAddComment()} className="add-comment-btn">Post Comment</button>
                    </div>
                    {comments && comments.filter(comment => comment.status === "Accepted").map((comment,idx) => (
                        <div key={idx} className="comment">
                        <img src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${comment.username}`} alt={`${comment.username}'s avatar`} className="avatar" />
                        <div className="comment-content">
                            <div className="comment-header">
                            <h4>{comment.username}</h4>
                            {/* <span className="time">{comment.time}</span> */}
                            </div>
                            <p>{comment.content}</p>
                        </div>
                        </div>
                    ))}
                    </div>
            </div>
        </div>
    )
}
export default Home;