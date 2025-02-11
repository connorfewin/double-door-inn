import React, { useState, useEffect } from 'react';
import { Badge, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { fetchAllUnverifiedCommentsAPI } from '../../Api/comment';
import '../../Styles/Pages/CommentsPage.css';
import { Link } from 'react-router-dom';

const VerifyComments = () => {
  const [unverifiedComments, setUnverifiedComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await fetchAllUnverifiedCommentsAPI();
      setUnverifiedComments(comments);
    };
    fetchComments();
  }, []);

  return (
    <>
      <IconButton
        color="inherit"
        component={Link} to="/verify-comments"
        sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
      >
        <Badge color="secondary" badgeContent={unverifiedComments.length}>
          <MailIcon />
        </Badge>
      </IconButton>
    </>
  );
};

export default VerifyComments;
