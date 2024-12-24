import React from "react";
import "../Styles/CommentCard.css";

function CommentCard({ comment, index }) {
  const hasImage = comment.images && comment.images[0];

  return (
    <div className="CommentCardContainer">
      <div className="CommentCardContent">
        {/* Image Section */}
        {hasImage && (
          <div className="CommentCardImage">
            <img
              src={comment.images[0]}
              alt={`Slide ${index + 1}`}
            />
          </div>
        )}
        
        {/* Info Section */}
        <div className="CommentCardInfo">
          <h3 className="CommentCardTitle">{comment.title}</h3>
          {/* Conditional Description Styling */}
          <p 
            className={
              hasImage 
                ? "CommentCardDescriptionWithImage" 
                : "CommentCardDescriptionWithoutImage"
            }
          >
            {comment.descripton}
          </p>
          <p className="CommentCardAuthor">- {comment.author}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
