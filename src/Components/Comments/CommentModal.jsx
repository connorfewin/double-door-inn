import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import '../../Styles/Components/CommentModal.css';

function CommentModal({ isOpen, onClose, comment }) {
  if (!isOpen || !comment) return null;

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        {/* The scrollable area for images + text */}
        <div className="modal-body">
          {/* Single image */}
          {comment.images && comment.images.length === 1 && (
            <div className="modal-image-container">
              <img
                src={comment.images[0]}
                alt="Comment"
                className="modal-image"
              />
            </div>
          )}

          {/* Multiple images */}
          {comment.images && comment.images.length > 1 && (
            <div className="modal-image-container">
              <Carousel
                className="my-carousel"
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                dynamicHeight={false}
              >
                {comment.images.map((imgUrl, idx) => (
                  <div key={idx}>
                    <img
                      src={imgUrl}
                      alt={`Comment ${idx}`}
                      className="modal-image"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          <div className="modal-text-container">
            <p className="CommentDisplayAuthor">- {comment.author}</p>
            <p className="CommentDisplayDescription">
              {comment.descripton}
            </p>
          </div>
        </div>

        {/* Close Button stays outside the scrolling area */}
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default CommentModal;
