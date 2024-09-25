import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { signIn } from 'aws-amplify/auth';

const SignIn = ({ email, setEmail, password, setPassword, handleClose, setIsAuthenticated }) => {
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    try {
      await signIn({ username: email, password });
      setIsAuthenticated(true); // Update the authentication state
      handleClose();
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.message || 'An error occurred during sign in.'); // Set error message
    }
  };

  return (
    <form onSubmit={handleSignIn} style={{ position: 'relative' }}>
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
      {error && (
        <Typography 
          color="error" 
          style={{paddingTop: '10px'}}
        >
          {error}
        </Typography>
      )}
    </form>
  );
};

export default SignIn;
