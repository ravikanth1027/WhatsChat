import React, { useState } from 'react';

async function getContacts(number) {
 return fetch('http://localhost:8080/contacts?number='+ number, {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json'
   },
   /*body: JSON.stringify(credentials)*/
 })
   .then(data => data.json())
}

export default function getHelp(){
  return "PLEASE HELP"
}