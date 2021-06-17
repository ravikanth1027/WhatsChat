import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login/Login.css';

export default function MainWelcome({ setToken }) {
  
  return(
    <div className="login-wrapper">
      <h1>Welcome to VOIP Chat Messenger </h1>
      <a href="login">Login</a>
      <a href="register">Register</a>
    </div>
  )
}
