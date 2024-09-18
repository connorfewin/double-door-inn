import React, { useState } from 'react';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Link } from '@mui/material';
import '../Styles/Profile.css'; // Import the CSS file for styling
import '../Styles/Modals.css'

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Track if it's a sign-up form

  const handleClick = () => {
    setOpen(true); // Open the modal when the icon is clicked
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
    setIsSignUp(false); // Reset to sign-in when modal closes
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp); // Toggle between sign-in and sign-up
  };

  return (
    <div>
      <div className="profile-icon">
        <AccountBoxRoundedIcon
          style={{ fontSize: 55, cursor: 'pointer' }}
          onClick={handleClick}
        />
      </div>

      {/* Modal for Sign In / Sign Up */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
            />
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
              fullWidth
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          {/* Link to toggle between Sign In and Sign Up */}
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <Link component="button" variant="body2" onClick={toggleSignUp}>
                Sign In
              </Link>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <Link component="button" variant="body2" onClick={toggleSignUp}>
                Sign Up
              </Link>
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
