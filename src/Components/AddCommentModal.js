import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { createCommentAPI } from '../Api/comment';

function AddCommentModal({ open, onClose }) {
  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  // Handle form submission
  const handleSubmit = async () => {
    if (!title || !description || !author) {
      console.warn('All fields are required');
      return;
    }

    setIsSubmitting(true); // Start submission state

    try {
      const commentData = {
        title,
        description,
        author,
      };

      const createdComment = await createCommentAPI(commentData);
      console.log('Submitted Comment:', createdComment);

      // Clear form fields after successful submission
      setTitle('');
      setDescription('');
      setAuthor('');
      onClose(); // Close modal
    } catch (error) {
      console.error('Failed to create comment:', error.message);
    } finally {
      setIsSubmitting(false); // End submission state
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-comment-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%', // Default width for mobile
          maxWidth: '400px', // Limit max width on larger screens
          maxHeight: '90vh', // Prevent modal from exceeding viewport height
          overflowY: 'auto', // Enable scrolling for overflow content
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Add a Comment</h2>
        
        {/* Title Field */}
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          disabled={isSubmitting}
        />
        
        {/* Description Field */}
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          disabled={isSubmitting}
        />
        
        {/* Author Field */}
        <TextField
          fullWidth
          label="Author"
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          margin="normal"
          disabled={isSubmitting}
        />
        
        {/* Submit Button */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </Modal>
  );
}

export default AddCommentModal;
