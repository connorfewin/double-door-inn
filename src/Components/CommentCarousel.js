import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CommentCard from "./CommentCard";
import AddCommentModal from "./AddCommentModal";
import { fetchAllCommentsAPI } from "../Api/comment";

import "../Styles/CommentCarousel.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function CommentCarousel() {
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchAllCommentsAPI();
      setComments(fetchedComments); // Store fetched comments in state
    };

    fetchComments();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <Carousel
        responsive={responsive}
        infinite={true}
        keyBoardControl={true}
        showDots={false}
        draggable
        pauseOnHover
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {comments.map((comment, index) => (
          <div key={index} style={{ padding: "10px" }}>
            <CommentCard comment={comment} />
          </div>
        ))}
      </Carousel>
      
      {/* Add Comment Button */}
      <div className="AddCommentButton">
        <Button onClick={handleOpenModal}>Add New</Button>
      </div>

      {/* Add Comment Modal */}
      <AddCommentModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default CommentCarousel;
