import React, {Component, Fragment} from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

class AddSpot extends Component {
  state = {

  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert("Yo");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
        <label>
          Name
          <input
              name="name"
              type="text"
              value={this.state.name} onChange={this.handleChange} />
        </label>
        <label>
          Description:
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange} />
        </label>
        </form>
      </div>
    )
  }
}

export default AddSpot
