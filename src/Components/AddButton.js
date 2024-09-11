import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import '../Styles/AddButton.css';

const AddButton = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    DATE: '',
    HEADLINER: '',
    OPENER: '',
    NOTES: '',
    DAY: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onAdd(formData);
    setFormData({ DATE: '', HEADLINER: '', OPENER: '', NOTES: '', DAY: '' });
    handleClose();
  };

  return (
    <div className="add-button-container">
      <Button className="add-button" onClick={handleOpen}>
        +
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box">
          <h2>Add New Entry</h2>
          <TextField
            name="DATE"
            label="Date"
            value={formData.DATE}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="HEADLINER"
            label="Headliner"
            value={formData.HEADLINER}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="OPENER"
            label="Opener"
            value={formData.OPENER}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="NOTES"
            label="Notes"
            value={formData.NOTES}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="DAY"
            label="Day"
            value={formData.DAY}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddButton;
