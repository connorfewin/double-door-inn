import React from "react";

function CommentThumbnail({ comment }) {
  return (
    <div className="CommentThumbnailContainer">
      <div className="CommentText">
        {comment.author && (
          <p className="CommentCarouselAuthor">-{comment.author}</p>
        )}
        <p className="CommentDescripton">{comment.descripton}</p>
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
