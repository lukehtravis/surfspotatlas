import React, {Component, Fragment} from 'react'
import { Query, graphql } from "react-apollo";
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
    this.props.mutate({
        variables: {
          name: this.state.name,
          nickname: this.state.nickname,
          description: this.state.description,
          directions: this.state.directions
        },
    })
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Name
            <input
                name="name"
                type="text"
                value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Nickname:
              <input
                name="nickname"
                type="text"
                value={this.state.nickname}
                onChange={this.handleChange} />
          </label>
          <label>
            Description:
              <input
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleChange} />
          </label>
          <label>
            Directions:
              <input
                name="directions"
                type="text"
                value={this.state.directions}
                onChange={this.handleChange} />
          </label>

          <button onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}
const MUTATION = gql`
mutation AddSpot($name: String, $nickname: String, $description: String, $directions: String) {
  insert_Waves(objects: {name: $name, nickname: $nickname, description: $description, directions: $directions}) {
    returning {
      name,
      nickname,
      description,
      directions
    }
  }
}
`
export default graphql(MUTATION)(AddSpot)
