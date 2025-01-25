import React from 'react';
import CommentThumbnail from './CommentThumbnail';
import '../../Styles/Components/CommentCarousel.css';

function CommentCarousel({ comments, onCommentSelect, selectedComment }) {
  return (
    <div className="CommentCarousel">
      {comments.map((comment) => (
        <CommentThumbnail comment={comment} onCommentSelect={onCommentSelect} isSelected={comment?.id  === selectedComment?.id}/>
      ))}
    </div>
  );
}

export default CommentCarousel;
