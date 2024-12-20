import React, { useEffect, useState } from "react";
import { Modal, Box, Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { editShowAPI } from "../Api/show";

function EditButton({ selectedRows, shows, setShows }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        date: null,
        headliner: '',
        opener: '',
        notes: '',
    });

    useEffect(() => {
        if (selectedRows.length === 1) {
            const show = shows.find((show) => show.id === selectedRows[0]);
            console.log("Show: ", show);
            const newFormData = {
                id: show.id,
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

        const duplicate = shows.find(row =>
            row.headliner.toLowerCase() === newEntry.headliner.toLowerCase() && row.date === newEntry.date
        );

        if (duplicate) {
            setError(`${duplicate.headliner} already has a show on ${duplicate.date}.`);
            return;
        }

        try {
            const updatedShow = await editShowAPI(newEntry);

            // Update the shows array with the updated show
            setShows((prevShows) =>
                prevShows.map((show) =>
                    show.id === updatedShow.id ? updatedShow : show
                )
            );

            handleClose();
        } catch (e) {
            // Handle the error here, e.g.:
            setError('Could not edit show');
            console.error(e);
        }
    };

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => { setError(''); setOpen(false) };
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
                        {error && <div style={{ color: 'red', paddingBottom: '10px' }}>{error}</div>}
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