import { useEffect, useState } from "react";
import "./admin.scss";
import axios from "axios";


const Comments = () => {
    const [comments, setComments] = useState([]);

    const getComments = async() => {
        try{
            const res = await axios.get(`${import.meta.env.VITE_BACK_LINK}/planet/getComments`);
            if(res.data.comments){
                setComments(res.data.comments);
                // console.log(res.data.comments);
            } else {
                console.log(res.data.error);
            }
        } catch(error){
            console.log({error: error});
        }
    }
    const handleDelete = async(planetID,commentID) => {
        try{
            const res = await axios.delete(`${import.meta.env.VITE_BACK_LINK}/planet/deleteComment/${planetID}/${commentID}`);
            if(res.data.success){
                getComments();
            } else {
                console.log(res.data.error);
            }
            console.log(res);
        } catch(error){
            console.log(error);
        }
    }
    const handleStatus = async(planetID,commentID,status) => {
        try{
            const res = await axios.post(`${import.meta.env.VITE_BACK_LINK}/planet/commentStatus`, {planetID,commentID,status});
            if(res.data.success){
                getComments();
            } else {
                console.log(res.data.error);
            }
            console.log(res.data);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getComments();
    },[])

    return(
        <div className="manage_comments">
            <table className="planets-table">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Username</th>
                        <th>Post name</th>
                        <th>Comment</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {comments && comments.map((comment, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{comment.username}</td>
                            <td>{comment.planetName}</td>
                            <td>{comment.content}</td>
                            <td>{comment.status}</td>
                            <td>
                                {comment.status === "Pending" && (
                                    <>
                                        <button className="nrml" onClick={e=>handleStatus(comment?.planetID,comment?.commentID,"Accepted")}>Accept</button>
                                        <button className="nrml" onClick={e=>handleStatus(comment?.planetID,comment?.commentID,"Declined")}>Decline</button>
                                    </>
                                )}
                                {comment.status === "Declined" && <button className="nrml" onClick={e=>handleStatus(comment?.planetID,comment?.commentID,"Accepted")}>Accept</button>}
                                {comment.status === "Accepted" && <button className="nrml" onClick={e=>handleStatus(comment?.planetID,comment?.commentID,"Declined")}>Decline</button>}
                                <button className="delete" onClick={e=>handleDelete(comment?.planetID,comment?.commentID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Comments;