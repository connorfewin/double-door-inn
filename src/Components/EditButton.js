import React, { useEffect, useState } from "react";
import { Modal, Box, Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function EditButton({ selectedRows, shows, setError }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        date: null,
        headliner: '',
        opener: '',
        notes: '',
    });

    useEffect(() => {
        if(selectedRows.length === 1) {
            const show = shows.find((show) => show.id === selectedRows[0]);
            console.log("Show: ", show);
            const newFormData = {
                date: dayjs(show.date),
                headliner: show.headliner,
                opener: show.opener,
                notes: show.notes,
            }
            setFormData(newFormData);
        }
    }, [selectedRows]);

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleDateChange = (newDate) => {
        console.log(newDate)
        setFormData({
          ...formData,
          date: newDate,
        });
      };

        const handleSubmit = async () => {
          const formattedDate = formData.date ? dayjs(formData.date).format('MM/DD/YYYY') : null;
          const dayOfWeek = formData.date ? dayjs(formData.date).format('dddd') : '';
          const newEntry = { ...formData, date: formattedDate, day: dayOfWeek };
        
          // Call onAdd and get the error status
        //   const result = await onAdd(newEntry);
          
          // Check if there is an error
        //   if (!result.error) {
        //     setFormData({ date: null, headliner: '', opener: '', notes: '' }); // Reset form data
        //     handleClose(); // Close modal only if there is no error
        //   }
          handleClose();
          console.log("This is the change: ", newEntry);
        };

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {setError(''); setOpen(false)};
    return (
        <>
            <Button
                variant="contained"
                className="edit-button"
                disabled={selectedRows.length === 0 || selectedRows.length > 1}
                onClick={handleClick}
                style={{ marginLeft: '0px' }}
            >
                Edit
            </Button>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Modal open={open} onClose={handleClose}>
                    <Box className="modal-box">
                        <h2>Edit Entry</h2>
                        {/* {errorMessage && <div style={{ color: 'red', paddingBottom: '10px' }}>{errorMessage}</div>} Display error message */}
                        <DatePicker
                            label="Date"
                            value={formData.date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                        />
                        <TextField
                            name="headliner"
                            label="Headliner"
                            value={formData.headliner}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="opener"
                            label="Opener"
                            value={formData.opener}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="notes"
                            label="Notes"
                            value={formData.notes}
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
        </>
    );
}

export default EditButton;