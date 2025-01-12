import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import "../Styles/Components/CommentDisplay.css";

function CommentDisplay({ comment }) {
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    if (comment.images && comment.images[0]) {
      const img = new Image();
      img.src = comment.images[0];
      img.onload = () => {
        // If width >= height, treat it as 'horizontal'
        setIsHorizontal(img.width > img.height);
      };
    }
  }, [comment]);

  return (
    <div className="CommentDisplay">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        style={{ height: "100%" }}
      >
        <div
          className={`ScrollableContent ${
            isHorizontal ? "HorizontalLayout" : "VerticalLayout"
          }`}
        >
          {comment.images && comment.images[0] && (
            <>
              {isHorizontal ? (
                // For wide (horizontal) images: Image on top, Text below
                <>
                  <img
                    src={comment.images[0]}
                    alt="Comment"
                    className="CommentImage ImageTop"
                    style={{borderRadius: '5px'}}
                  />
                  <div className="TextContent">
                    {comment.author && (
                      <p className="CommentDisplayAuthor">
                        -{comment.author}
                      </p>
                    )}
                    <p className="CommentDisplayDescription">
                      {comment.descripton}
                    </p>
                  </div>
                </>
              ) : (
                // For tall (vertical) images: Text on the left, Image on the right
                <>
                  <div className="TextContent">
                    {comment.author && (
                      <p className="CommentDisplayAuthor">
                        -{comment.author}
                      </p>
                    )}
                    <p className="CommentDisplayDescription">
                      {comment.descripton}
                    </p>
                  </div>
                  <img
                    src={comment.images[0]}
                    alt="Comment"
                    className="CommentImage ImageRight"
                    style={{borderRadius: '5px'}}
                  />
                </>
              )}
            </>
          )}

          {/* If there's no image, just display text */}
          {(!comment.images || comment.images?.length === 0) && (
            <div className="TextContent">
              {comment.author && (
                <p className="CommentDisplayAuthor">-{comment.author}</p>
              )}
              <p className="CommentDisplayDescription">{comment.descripton}</p>
            </div>
          )}
        </div>
      </Scrollbars>
    </div>
  );
}

export default CommentDisplay;
