import React from 'react';
import { TextField, Button } from '@mui/material';
import { signIn } from 'aws-amplify/auth';

const SignIn = ({ email, setEmail, password, setPassword, handleClose, setIsAuthenticated }) => {
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn({ username: email, password });
      setIsAuthenticated(true); // Update the authentication state
      handleClose();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <TextField
        autoFocus
        margin="dense"
        id="email"
        label="Email Address"
        type="email"
        fullWidth
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        fullWidth
      >
        Sign In
      </Button>
    </form>
  );
};

export default SignIn;
