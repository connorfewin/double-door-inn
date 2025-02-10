import React, { useContext, useState, useEffect } from 'react';
import CommentCarousel from '../Components/Comments/CommentCarousel';
import CommentDisplay from '../Components/Comments/CommentDisplay';
import { CommentsContext } from '../Contexts/CommentsContext';
import Scrollbars from 'react-custom-scrollbars-2';
import AddComment from '../Components/Comments/AddComment';
import CommentModal from '../Components/Comments/CommentModal';

import '../Styles/Pages/CommentsPage.css';

function CommentsPage() {
  const { comments, isLoading } = useContext(CommentsContext);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (comments.length > 0) {
      setSelectedComment(comments[0]);
    }
  }, [comments]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCommentSelect = (comment) => {
    setSelectedComment(comment);
    if (isMobile) {
      setShowModal(true);
    }
  };

  if (isLoading) return <p>Loading comments...</p>;

  return (
    <div className="CommentsContainer">
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

      {!isMobile && selectedComment && (
        <div className="CommentDisplayContainer">
          <CommentDisplay comment={selectedComment} />
        </div>
      )}

      <CommentModal isOpen={showModal} onClose={() => setShowModal(false)} comment={selectedComment} />
    </div>
  );
}

export default CommentsPage;
