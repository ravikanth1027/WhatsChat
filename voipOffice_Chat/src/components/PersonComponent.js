import React from 'react';
import $ from 'jquery';

export default class PersonComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    }
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    var context = this;

    $.ajax({
      url: 'http://localhost:8080/contacts?number=8939668158',
      method: 'GET',
      success: function(response) {
        console.log(response)
        context.setState({
          name: response.name
        });
      }
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
}