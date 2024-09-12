import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

function DeleteButton({ selectionModel, rows, setRows, setSelectionModel, setFilteredRows }) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    const remainingRows = rows.filter((row) => !selectionModel.includes(row.id));
    setRows(remainingRows);
    setFilteredRows(remainingRows); // Ensure filteredRows is updated too
    setSelectionModel([]);
    setOpen(false); // Close the modal after deleting
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
              const selectedRow = rows.find((row) => row.id === id);
              return (
                <Typography key={id}>
                  <strong>Date:</strong> {selectedRow?.DATE}, <strong>Headliner:</strong> {selectedRow?.HEADLINER}
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
