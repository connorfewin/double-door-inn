import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { createCommentAPI } from '../Api/comment';
import ImageDropzone from './ImageDropzone';

function AddCommentModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    files: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = (files) => {
    setFormData(prev => ({ ...prev, files }));
  };

  const handleSubmit = async () => {
    const { title, description, author, files } = formData;

    if (!title && !description && !author) {
      console.warn('All fields are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const commentData = {
        title,
        description,
        author,
        images: files.map(file => file.file),
      };
      const createdComment = await createCommentAPI(commentData);
      console.log('Submitted Comment:', createdComment);

      setFormData({ title: '', description: '', author: '', files: [] });
      onClose();
    } catch (error) {
      console.error('Failed to create comment:', error.message);
    } finally {
      setIsSubmitting(false);
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
          width: '90%',
          maxWidth: '440px',
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Add a Comment</h2>

        <TextField
          fullWidth
          label="Type Comment Here"
          name="description"
          variant="outlined"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          disabled={isSubmitting}
        />

        <TextField
          fullWidth
          label="Author"
          name="author"
          variant="outlined"
          value={formData.author}
          onChange={handleChange}
          margin="normal"
          disabled={isSubmitting}
        />

        <ImageDropzone onFilesChange={handleFilesChange} />

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
