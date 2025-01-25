import React, { useState, useEffect } from 'react';
import CommentCarousel from '../Components/Comments/CommentCarousel';
import CommentDisplay from '../Components/Comments/CommentDisplay';
import { fetchAllVerifiedCommentsAPI } from '../Api/comment';
import Scrollbars from 'react-custom-scrollbars-2';
import AddComment from '../Components/Comments/AddComment';

import '../Styles/Pages/CommentsPage.css';
import CommentModal from '../Components/Comments/CommentModal';

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);

  // Modal control
  const [showModal, setShowModal] = useState(false);

  // Track if viewport is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchAllVerifiedCommentsAPI();
      setComments(fetchedComments);
      if (fetchedComments.length > 0) {
        setSelectedComment(fetchedComments[0]);
      }
    };

    fetchComments();
  }, []);

  // Listen for window resize to toggle mobile/desktop state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCommentSelect = (comment) => {
    setSelectedComment(comment);
    if (isMobile) {
      // Open the modal on mobile
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="CommentsContainer">
      {/* Left Column: Carousel + AddComment */}
      <div className="CommentsCarouselContainer">
        <Scrollbars style={{ height: 'calc(100% - 50px)' }}>
          <CommentCarousel
            comments={comments}
            onCommentSelect={handleCommentSelect}
            selectedComment={selectedComment}
          />
        </Scrollbars>
        <div className="AddCommentContainer">
          <AddComment />
        </div>
      </div>

      {/* Right Column: Only show on desktop */}
      {!isMobile && selectedComment && (
        <div className="CommentDisplayContainer">
          <CommentDisplay comment={selectedComment} />
        </div>
      )}

      {/* The modal that appears on mobile */}
      <CommentModal
        isOpen={showModal}
        onClose={closeModal}
        comment={selectedComment}
      />
    </div>
  );
}

export default CommentsPage;
