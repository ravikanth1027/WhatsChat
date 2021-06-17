import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login/Login.css';
import { useHistory } from "react-router-dom";
import Axios from 'axios'

/*async function registerUser(credentials) {
  console.log(credentials)
 return fetch('http://localhost:8080/contacts', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: credentials
 })
   .then(data => data.json())
}*/

const registerUser=async(x)=>{
        console.log(x)
        const responselocaldb=await Axios.post('http://localhost:8080/contacts', x);
        /*const response=await Axios.post('http://localhost:8080/test', x);*/
        //setMessages(response.data) 
        console.log("sendMessages:"+responselocaldb.data)
        //msgStatus(response.data) 
  }
export default function Register() {
  const history = useHistory();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [phonenumber, setPhonenumber] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const userid = await registerUser({
      username,
      password,
      phonenumber
    });
    console.log(userid)
    history.push("/login");
  }

  return(
    <div className="login-wrapper">
      <h1>Please Register </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Phone Number</p>
          <input type="text" onChange={e => setPhonenumber(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Confirm Password</p>
          <input type="text" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
