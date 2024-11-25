import { useState } from "react";

const CommentManagement = () => {
  const [comments, setComments] = useState([
    { id: 1, comment: "Great post!", postId: 101, status: "Pending" },
    { id: 2, comment: "I disagree", postId: 102, status: "Approved" },
  ]);

  const toggleApproval = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, status: comment.status === "Approved" ? "Pending" : "Approved" }
          : comment
      )
    );
  };

  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="comment-management">
      <h2>Comment Management</h2>
      <table>
        <thead>
          <tr>
            <th>Comment</th>
            <th>Post ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.comment}</td>
              <td>{comment.postId}</td>
              <td>{comment.status}</td>
              <td>
                <button onClick={() => toggleApproval(comment.id)}>
                  {comment.status === "Approved" ? "Disapprove" : "Approve"}
                </button>
                <button onClick={() => deleteComment(comment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentManagement;