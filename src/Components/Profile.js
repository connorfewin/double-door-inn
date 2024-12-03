import React, { useState, useEffect } from 'react';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { Dialog, DialogTitle, DialogContent, /* Link,*/ Button, Snackbar } from '@mui/material';
import { signOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import SignIn from './SignIn';
// import SignUp from './SignUp';
import '../Styles/Profile.css';
import '../Styles/Modals.css';

const Profile = ({ setSuperAdmin }) => {
  const [open, setOpen] = useState(false);
  // const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        const user = await fetchUserAttributes();
        setSuperAdmin(user["custom:superAdmin"] === "true");

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkUser();
  }, [setSuperAdmin]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setIsSignUp(false); // Commented out
    resetForm();
  };

  // const toggleSignUp = () => { // Commented out
  //   setIsSignUp(!isSignUp);
  //   resetForm();
  // }; 

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setSuperAdmin(false);
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
        <DialogTitle>{isAuthenticated ? 'Profile' : 'Sign In'}</DialogTitle>
        <DialogContent>
          {isAuthenticated ? (
            <div>
              <p style={{marginTop: '0px', marginBottom: '20px'}}>You are currently signed in.</p>
              <Button variant="contained" color="primary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <SignIn 
              email={email} 
              setEmail={setEmail} 
              password={password} 
              setPassword={setPassword} 
              handleClose={handleClose}
              setIsAuthenticated={setIsAuthenticated}
              setSuperAdmin={setSuperAdmin}
            />
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
