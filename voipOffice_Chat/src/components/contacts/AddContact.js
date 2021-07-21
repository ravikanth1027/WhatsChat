import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddContact.css';
import * as pageBase from '../../../pageBase'

async function addContactApi(contactDetails) {
  var url = 'http://108.60.134.228:8080/addcontact'
 return fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(contactDetails)
 })
   .then(data => data.json())
}

export default function AddContact({mynumber}) {
  const [name, setname] = useState();
  const [number, setnumber] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await addContactApi({
      "phonenumber": mynumber,
      name,
      number,
      "avatar" : "https://s3.amazonaws.com/uifaces/faces/twitter/mhaligowski/128.jpg"
    });
    console.log(token)
  }

  return(
    <div className="login-wrapper">
      <h1>Please Add Your Contact</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input type="text" onChange={e => setname(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="number" onChange={e => setnumber(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}