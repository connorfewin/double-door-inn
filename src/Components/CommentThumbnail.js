import React from "react";
import '../Styles/Components/CommentThumbnail.css';

function CommentThumbnail({ comment, onCommentSelect }) {

  return (
    <div
      key={comment.id}
      className="CommentThumbnailContainer"
      onClick={() => onCommentSelect(comment)}
    >
      <div className="CommentText">
        {comment.author && (
          <p className="CommentAuthor">-{comment.author}</p>
        )}
        <p className="CommentDescription">{comment.descripton}</p>
      </div>
      {comment.images?.length > 0 && (
        <img
          src={comment.images[0]}
          alt="Thumbnail"
          className="CommentThumbnailImage"
        />
      )}
    </div>
  );
}

export default CommentThumbnail;
