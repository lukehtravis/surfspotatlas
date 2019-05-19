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
    const date = new Date();
    const timestamp = date.getTime();
    this.props.mutate({
        variables: {
          name: this.state.name,
          nickname: this.state.nickname,
          description: this.state.description,
          directions: this.state.directions,
          bathymetry: this.state.bathymetry,
          wavetype: this.state.wavetype,
          wavelength: this.state.wavelength
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
          <select name="bathymetry" value={this.state.bathymetry} onChange={this.handleChange} >
              <option value="sand">Sand</option>
              <option value="reef">Reef</option>
              <option value="sand-reef">Sand And Reef</option>
          </select>
          <select name="wavetype" value={this.state.wavetype} onChange={this.handleChange} >
              <option value="beachbreak">Beach Break</option>
              <option value="reefbreak">Reef Break</option>
              <option value="pointbreak">Point Break</option>
          </select>
          <input type="range" min="1" max="100" value={this.state.wavelength} className="value-slider" id="length-slider" onChange={this.handleChange} />
          <button onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}
const MUTATION = gql`
mutation AddSpot($name: String, $nickname: String, $description: String, $directions: String, $bathymetry: String, $wavetype: String, $wavelength: Int) {
  insert_Waves(objects: {name: $name, nickname: $nickname, description: $description, directions: $directions, bathymetry: $bathymetry, wavetype: $wavetype, wavelength: $wavelength}) {
    returning {
      name,
      nickname,
      description,
      directions,
      bathymetry,
      wavetype,
      wavelength
    }
  }
}
`
export default graphql(MUTATION)(AddSpot)
