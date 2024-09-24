import React, { useState, useEffect } from 'react';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { Dialog, DialogTitle, DialogContent, Link, Button, Snackbar } from '@mui/material';
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../Styles/Profile.css';
import '../Styles/Modals.css';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkUser();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsSignUp(false);
    resetForm();
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      handleClose();
      setSnackbarMessage('Successfully signed out.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error signing out:', error);
      setSnackbarMessage('Error signing out. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <div className="profile-icon">
        <AccountBoxRoundedIcon
          style={{ fontSize: 55, cursor: 'pointer' }}
          onClick={handleClick}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isAuthenticated ? 'Profile' : (isSignUp ? 'Sign Up' : 'Sign In')}</DialogTitle>
        <DialogContent>
          {isAuthenticated ? (
            <div>
              <p>You are currently signed in.</p>
              <Button variant="contained" color="primary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              {isSignUp ? (
                <SignUp 
                  email={email} 
                  setEmail={setEmail} 
                  password={password} 
                  setPassword={setPassword} 
                  handleClose={handleClose} 
                />
              ) : (
                <SignIn 
                  email={email} 
                  setEmail={setEmail} 
                  password={password} 
                  setPassword={setPassword} 
                  handleClose={handleClose}
                  setIsAuthenticated={setIsAuthenticated} // Pass the setter function
                />
              )}
              <p>
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <Link component="button" variant="body2" onClick={toggleSignUp}>
                      Sign In
                    </Link>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <Link component="button" variant="body2" onClick={toggleSignUp}>
                      Sign Up
                    </Link>
                  </>
                )}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Profile;
