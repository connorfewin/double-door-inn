import React, { useEffect } from 'react';
import Scrollbars from "react-custom-scrollbars-2";
import '../Styles/Components/CommentModal.css';
import ImageCarousel from './ImageCarousel';

function CommentModal({ isOpen, onClose, comment }) {
  if (!isOpen || !comment) return null;

  console.log(`Comment in comment modal: ${JSON.stringify(comment)}`);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
      >
        {/* Close Button (optional) */}
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        
        {comment.images && comment.images.length > 0 && (
          <div className="modal-image-container">
            <img
              src={comment.images[0]}
              alt="Comment"
              className="modal-image"
            />
          </div>
        )}
        <div className='modal-text-container'>
          <p className="CommentDisplayAuthor">- {comment.author}</p>
          <p className="CommentDisplayDescription">{comment.descripton}</p>
        </div>

      </div>
    </div>
  );
}

export default CommentModal;
