import React, { useEffect } from "react";
import "../Styles/Comment.css";
function Comment({ comment, index }) {
  useEffect(() => {
    console.log("comment: ", comment);
  }, []);
  return (
    <div className="CommentContainer">
      <div className="CommentContent">
        {comment.images && (
          <img
            src={comment.images[0]}
            alt={`Slide ${index + 1}`}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />
        )}
        <h3>{comment.title}</h3>
        <p>{comment.descripton}</p>
        <p>- {comment.author}</p>
      </div>
    </div>
  );
}

export default Comment;
