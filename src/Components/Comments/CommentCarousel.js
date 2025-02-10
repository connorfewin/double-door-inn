import React from 'react';
import CommentThumbnail from './CommentThumbnail';
import '../../Styles/Components/CommentCarousel.css';

function CommentCarousel({ comments, onCommentSelect, selectedComment }) {
  return (
    <div className="CommentCarousel">
      {comments.map((comment) => (
        <CommentThumbnail 
          key={comment.id}
          comment={comment} 
          onCommentSelect={onCommentSelect} 
          isSelected={comment?.id === selectedComment?.id} 
        />
      ))}
    </div>
  );
}


export default CommentCarousel;
