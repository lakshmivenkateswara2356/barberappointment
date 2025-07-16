// src/components/otpsystem/OTPLogin.jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const OTPLogin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  }, []);

  const handleSendOtp = async () => {
    setError('');
    setSuccess('');

    if (!phone || !phone.startsWith('+') || phone.length < 10) {
      setError('Please enter a valid phone number including country code.');
      return;
    }

    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setIsOtpSent(true);
      setSuccess('OTP sent successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to send OTP. Please check the number.');
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setSuccess('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      setSuccess('Phone number verified successfully!');
    } catch (err) {
      console.error(err);
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="otp-container" style={styles.container}>
      <h2 style={styles.title}>OTP Login</h2>

      {!isOtpSent ? (
        <>
          <PhoneInput
            country={'in'}
            value={phone}
            onChange={(value) => setPhone('+' + value)}
            inputStyle={styles.input}
            specialLabel=""
          />
          <div id="recaptcha-container"></div>
          <button onClick={handleSendOtp} style={styles.button}>
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleVerifyOtp} style={styles.button}>
            Verify OTP
          </button>
        </>
      )}

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    marginTop: '1rem',
    textAlign: 'center'
  },
  success: {
    color: 'green',
    marginTop: '1rem',
    textAlign: 'center'
  }
};

export default OTPLogin;
