import React, {Component, Fragment} from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

class AddSpot extends Component {
state = {
  Name: "",
}

handleChange = (event) => {
  const inputName = event.target.name;
  console.log(inputName)
  this.setState({[inputName]: event.target.value})
}

handleSubmit(event) {
  event.preventDefault();
  alert("Yo");
}
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <input name="Name" type="text" value={this.state.value} onChange={this.handleChange} />
        </form>
      </div>
    )
  }
}

export default AddSpot
