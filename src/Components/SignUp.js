import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { signUp, confirmSignUp } from 'aws-amplify/auth';

const SignUp = ({ email, setEmail, password, setPassword, handleClose }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp({ username: email, password });
      setShowVerification(true); // Show verification code modal
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp({ username: email, confirmationCode: verificationCode });
      console.log('Verification successful');
      handleClose(); // Close the modal after verification
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <>
      {!showVerification ? (
        <form onSubmit={handleSignUp}>
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
            Create Account
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          <TextField
            autoFocus
            margin="dense"
            id="verificationCode"
            label="Verification Code"
            type="text"
            fullWidth
            variant="outlined"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            fullWidth
          >
            Verify
          </Button>
        </form>
      )}
    </>
  );
};

export default SignUp;
