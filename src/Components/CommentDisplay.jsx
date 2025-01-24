import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import "../Styles/Components/CommentDisplay.css";
import ImageCarousel from "./ImageCarousel";

function CommentDisplay({ comment }) {

  
  return (
    <div className="CommentDisplay">
      <Scrollbars autoHide universal>
        {comment.images && comment.images.length === 1 && (
          <img
            src={comment.images[0]}
            alt="Comment"
            className="CommentDisplayImage"
          />
        )}
        {comment.images && comment.images.length > 1 && (
          <ImageCarousel commentImages={comment.images} />
        )}
        
        <p className="CommentDisplayAuthor">- {comment.author}</p>
        <p className="CommentDisplayDescription">{comment.descripton}</p>

      </Scrollbars>
    </div>
  );
}

export default CommentDisplay;
