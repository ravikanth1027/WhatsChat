import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Dashboard from '../Dashboard/Dashboard'
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

async function loginUser(credentials) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}


async function adminloginUser(credentials) {
 return fetch('http://localhost:8080/adminlogin', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken}) {
  const history = useHistory();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  
  const handleSubmit = async e => {
    e.preventDefault();
    if(username === "admin"){
      const token = await adminloginUser({
      username,
      password
    });
    console.log("Help",token)
    setToken(token)
    history.push("/admin");  
    }else{
      const token = await loginUser({
      username,
      password
    });
    console.log("Help",token)
    setToken(token);
    history.push("/dashboard");
    }
    
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <a href="register">Register</a>
    </div>
  )
}