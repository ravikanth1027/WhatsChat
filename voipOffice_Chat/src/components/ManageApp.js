import React, { Component } from 'react';
import Axios from 'axios'

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
    this.state.phonenumber = this.props.dataFromParent
    const response= Axios.post('http://108.60.134.228:8080/addcontact', this.state);
    return response.json();
    event.preventDefault();
}

showForm = () => {
   return (
     <div> 
    <form onSubmit={this.handleSubmit}>
        <label>
          Guest Name:
          <input type="text" value={this.state.value} name="name" onChange={this.handleChange} />
          GuestNumber:
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