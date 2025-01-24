import React, { useState, useEffect } from 'react';
import CommentCarousel from '../Components/CommentCarousel';
import CommentDisplay from '../Components/CommentDisplay';
import { fetchAllUnverifiedCommentsAPI } from "../Api/comment";
import '../Styles/Pages/CommentsPage.css';
import '../Styles/Pages/UnverifiedCommentsPage.css';
import Scrollbars from 'react-custom-scrollbars-2';
import { deleteCommentAPI, verifyCommentAPI } from "../Api/comment";

function UnverifiedCommentsPage() {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);

  // Fetch comments and set the first comment as selected when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchAllUnverifiedCommentsAPI();
      setComments(fetchedComments); // Store fetched comments in state
      if (fetchedComments.length > 0) {
        setSelectedComment(fetchedComments[0]);
      }
    };

    fetchComments();
  }, []);

  const handleCommentSelect = (comment) => {
    setSelectedComment(comment);
  };

  const handleVerify = async () => {
    try {
      await verifyCommentAPI(selectedComment);      
    } catch (error) {
      console.error("Failed to verify comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCommentAPI(selectedComment);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="CommentsContainer">
      <div className="CommentsCarouselContainer">
        <Scrollbars style={{ height: 'calc(100% - 50px)' }}>
          <CommentCarousel comments={comments} onCommentSelect={handleCommentSelect} />
        </Scrollbars>
        <div className="CommentActions">
            <button className="CommentButton VerifyButton" onClick={handleVerify}>
              Verify
            </button>
            <button className="CommentButton DeleteButton" onClick={handleDelete}>
              Delete
            </button>
          </div>
      </div>
      {selectedComment && (
        <div className="CommentDisplayContainer">
          <CommentDisplay comment={selectedComment} />
        </div>
      )}
    </div>
  );
}

export default UnverifiedCommentsPage;

