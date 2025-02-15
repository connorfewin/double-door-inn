import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { deleteShowAPI } from '../Api/show';

function DeleteButton({ selectionModel, shows, setShows, setSelectionModel, setFilteredShows }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
      try {
          // Filter out the shows that are not in the selection model
          const remainingShows = shows.filter((row) => !selectionModel.includes(row.id));
          
          // Update the shows and filtered shows state
          setShows(remainingShows);
          setFilteredShows(remainingShows);
          
          // Delete each selected show asynchronously
          for (const id of selectionModel) {
              await deleteShowAPI(id);
          }
          
          // Clear the selection model
          setSelectionModel([]);
          
          // Close the modal or confirmation dialog
          setOpen(false);
      } catch (error) {
          console.error("Error deleting shows:", error);
          // Optionally, show an error message to the user
      }
  };


  const handleOpenModal = () => {
    setOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpen(false); // Close the modal without deleting
  };

  return (
    <>
      <Button
        variant="contained"
        className="delete-button"
        onClick={handleOpenModal}
        disabled={selectionModel.length === 0}
        style={{ marginLeft: '10px' }}
      >
        Delete
      </Button>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the following entries?
            {selectionModel.map((id) => {
              const selectedRow = shows.find((row) => row.id === id);
              return (
                <Typography key={id}>
                  <strong>Date:</strong> {selectedRow?.date}, <strong>Headliner:</strong> {selectedRow?.headliner}
                </Typography>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteButton;
