import React, { Component } from 'react';
import Axios from 'axios'
import './ManageApp.css';
import * as pageBase from '../pageBase'

async function addcontact(state) {
    console.log("addcontact:", state)
    var payload = {
        "name" : state.name,
    "number" : state.number,
    "avatar" : state.avatar,
    "phonenumber" : state.phonenumber   // Please adjust this - THis is the logged in persons
    }
    var url = 'http://localhost:8080/addcontact'
    //var url = 'http://108.60.134.228:8080/deleteContact'
 return fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     Accept : 'application/json'
   },
   body: JSON.stringify(payload)
 })
   .then(data => data.json())
}

class ManageApp extends Component{
constructor(props) {
    super(props);
    this.state = { name: '' , number:'' , phonenumber:''};
    this.state = {showForm: false}
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    this.setState({[event.target.number]: event.target.value});
    /*this.setState({[event.target.phonenumber]: event.target.value});*/
  }

  handleSubmit = (event) => {
    console.log("handleSubmit121******************", this.state)
    this.state.phonenumber = this.props.dataFromParent
    /*var url = 'http://localhost:8080/'
    //var url = 'http://108.60.134.228:8080/'
    
    this.state.phonenumber = this.props.dataFromParent
    const response= Axios.post(url+'addcontact', this.state);*/
    const response = addcontact(this.state)
    return response.json();
    event.preventDefault();
    
}

showForm = () => {
   return (
     <div> 
    <form onSubmit={this.handleSubmit}>
        <label>
          Contact Name:
          <input type="text" value={this.state.value} name="name" onChange={this.handleChange} required/>
          Contact Number:
          <input type="text" value={this.state.value} name="number" onChange={this.handleChange} required/>
          <input type="hidden" value={this.state.value} name="phonenumber" onChange={this.props.dataFromParent} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
     );
 }



 showRemoveForm = () => {
   return (
     <div> 
    <form onSubmit={this.handleSubmit}>
        <label>
          Contact Name:
          <input type="text" value={this.state.value} name="name" onChange={this.handleChange} />
          Contact Number:
          <input type="text" value={this.state.value} name="number" onChange={this.handleChange} />
          <input type="hidden" value={this.state.value} name="phonenumber" onChange={this.props.dataFromParent} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
     );
 }

 render(){
    return (
        <div className='manage-app'>
        <button  onClick={() => this.setState({showForm: true}) }>Add Contact</button>        
        {this.state.showForm ? this.showForm() : null}
        </div>
    );
}
}
export default ManageApp