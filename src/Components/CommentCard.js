import React, { useState, useEffect } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../Styles/CommentCard.css";

function CommentCard({ comment, index }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate image loading time
    const imageLoader = new Image();
    if (comment.images && comment.images[0]) {
      imageLoader.src = comment.images[0];
      imageLoader.onload = () => setIsLoading(false);
    } else {
      setIsLoading(false); // No image to load
    }
  }, [comment.images]);

  const hasImage = comment.images && comment.images[0];

  return (
    <div className="CommentCardContainer">
      <div className="CommentCardContent">
        {/* Image Section */}
        {hasImage && (
          <div className="CommentCardImage">
            {isLoading ? (
              <Skeleton height={300} width="100%" />
            ) : (
              <img src={comment.images[0]} alt={`Slide ${index + 1}`} />
            )}
          </div>
        )}

        {/* Author */}
        <p className="CommentCardAuthor">- {comment.author}</p>

        {/* Description */}
        <p className="CommentCardDescription">
          {comment.descripton || <Skeleton count={2} />}
        </p>
      </div>
    </div>
  );
}

export default CommentCard;
