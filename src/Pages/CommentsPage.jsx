import React, { useState, useEffect } from 'react';
import CommentCarousel from '../Components/CommentCarousel';
import CommentDisplay from '../Components/CommentDisplay';
import { fetchAllCommentsAPI } from "../Api/comment";
import '../Styles/Pages/CommentsPage.css';
import Scrollbars from 'react-custom-scrollbars-2';
import AddComment from '../Components/AddComment';

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);

  // Fetch comments and set the first comment as selected when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchAllCommentsAPI();
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

  return (
    <div className="CommentsContainer">
      <div className="CommentsCarouselContainer">
        <Scrollbars style={{ height: 'calc(100% - 50px)' }}>
          <CommentCarousel comments={comments} onCommentSelect={handleCommentSelect} />
        </Scrollbars>
        <div className="AddCommentContainer">
          <AddComment />
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

export default CommentsPage;

