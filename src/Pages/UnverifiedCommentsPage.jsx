import React, { useState, useEffect } from 'react';
import CommentCarousel from '../Components/Comments/CommentCarousel';
import CommentDisplay from '../Components/Comments/CommentDisplay';
import CommentModal from '../Components/Comments/CommentModal';
import { 
  fetchAllUnverifiedCommentsAPI, 
  deleteCommentAPI, 
  verifyCommentAPI 
} from "../Api/comment";
import '../Styles/Pages/CommentsPage.css';
import '../Styles/Pages/UnverifiedCommentsPage.css';
import Scrollbars from 'react-custom-scrollbars-2';

function NoComments() {
  return (
    <div className="NoCommentsContainer">
      <p>If the number over the envelope in the top right is 0, there are no unverified events</p>
      <p>Loading Events...</p>
    </div>
  );
}

function UnverifiedCommentsPage() {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);

  // Modal control
  const [showModal, setShowModal] = useState(false);

  // Track if viewport is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchAllUnverifiedCommentsAPI();
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

  const removeCommentFromList = (commentToRemove) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.filter(
        (c) => c.id !== commentToRemove.id
      );
      if (updatedComments.length > 0) {
        setSelectedComment(updatedComments[0]);
      } else {
        setSelectedComment(null);
      }
      return updatedComments;
    });
  };

  const handleVerify = async () => {
    if (!selectedComment) return;

    const userConfirmed = window.confirm(
      `Are you sure you want to verify this comment by ${selectedComment.author}?`
    );

    if (!userConfirmed) return;

    try {
      await verifyCommentAPI(selectedComment);
      removeCommentFromList(selectedComment);
    } catch (error) {
      console.error("Failed to verify comment:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedComment) return;

    const userConfirmed = window.confirm(
      `Are you sure you want to delete this comment by ${selectedComment.author}? This action cannot be undone.`
    );

    if (!userConfirmed) return;

    try {
      await deleteCommentAPI(selectedComment);
      removeCommentFromList(selectedComment);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  if (comments.length === 0) {
    return <NoComments />;
  }

  return (
    <div className="CommentsContainer">
      {/* Left Column: Carousel */}
      <div className="CommentsCarouselContainer">
        <Scrollbars style={{ height: 'calc(100% - 50px)' }}>
          <CommentCarousel 
            comments={comments} 
            onCommentSelect={handleCommentSelect} 
            selectedComment={selectedComment}
          />
        </Scrollbars>
        <div className="CommentActions">
          <button 
            className="CommentButton VerifyButton" 
            onClick={handleVerify}
          >
            Verify
          </button>
          <button 
            className="CommentButton DeleteButton" 
            onClick={handleDelete}
          >
            Delete
          </button>
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

export default UnverifiedCommentsPage;
