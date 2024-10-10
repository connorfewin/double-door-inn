import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import '../Styles/Buttons.css'; 
import '../Styles/Modals.css'; 
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddButton = ({ onAdd, errorMessage }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    DATE: null,
    HEADLINER: '',
    OPENER: '',
    NOTES: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      DATE: newDate,
    });
  };

  const handleSubmit = async () => {
    const formattedDate = formData.DATE ? dayjs(formData.DATE).format('MM/DD/YYYY') : null;
    const dayOfWeek = formData.DATE ? dayjs(formData.DATE).format('dddd') : '';
    const newEntry = { ...formData, DATE: formattedDate, DAY: dayOfWeek };
  
    // Call onAdd and get the error status
    const result = await onAdd(newEntry);
    
    // Check if there is an error
    if (!result.error) {
      setFormData({ DATE: null, HEADLINER: '', OPENER: '', NOTES: '' }); // Reset form data
      handleClose(); // Close modal only if there is no error
    }
  };
  

  return (
    <div className="button-container">
      <Button className="add-button" onClick={handleOpen}>
        +
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Modal open={open} onClose={handleClose}>
          <Box className="modal-box">
            <h2>Add New Entry</h2>
            {errorMessage && <div style={{ color: 'red', paddingBottom: '10px', paddingTop: '5px'}}>{errorMessage}</div>} {/* Display error message */}
            <DatePicker
              label="Date"
              value={formData.DATE}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
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
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Modal>
      </LocalizationProvider>
    </div>
  );
};

export default AddButton;
