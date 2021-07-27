import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AdminLogin.css';
import Dashboard from '../Dashboard/Dashboard'
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import * as pageBase from '../../pageBase'

async function adminloginUser(credentials) {
  //var url = 'http://localhost:8080/adminlogin'
  var url = 'http://108.60.134.228:8080/adminlogin'
  
 return fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function AdminLogin({setAdmin}) {
  console.log("********")
  console.log(setAdmin)
  console.log("********")
  const history = useHistory();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  
  const handleSubmit = async e => {
    e.preventDefault();
    if(username === "admin"){
      const admin = await adminloginUser({
      username,
      password
    });
    console.log("Help",admin)
    setAdmin(admin);
    history.push("/admin");  
    }
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log Into Admin Page</h1>
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