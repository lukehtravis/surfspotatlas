import React, {Component, Fragment} from 'react'
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import Map from './Map'

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
    console.log(timestamp);
    this.props.mutate({
        variables: {
          name: this.state.name,
          nickname: this.state.nickname,
          description: this.state.description,
          directions: this.state.directions,
          bathymetry: this.state.bathymetry,
          wavetype: this.state.wavetype,
          wavelength: this.state.wavelength,
          wavequality: this.state.wavequality,
          wavedirection: this.state.wavedirection,
          wavehollowness: this.state.wavehollowness,
          wavedanger: this.state.wavedanger,
          lowtide: this.state.lowtide,
          hightide: this.state.hightide,
          datecreated: timestamp
        },
    })
  }

  render() {

    return (
      <div>
        <form>
          <div>
            <p>Name</p>
            <input
                name="name"
                type="text"
                value={this.state.name} onChange={this.handleChange} />
          </div>
          <div>
            <p>Nickname:</p>
              <input
                name="nickname"
                type="text"
                value={this.state.nickname}
                onChange={this.handleChange} />
          </div>
          <div>
            <p>Description:</p>
              <input
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleChange} />
          </div>
          <div>
            <p>Directions:</p>
              <input
                name="directions"
                type="text"
                value={this.state.directions}
                onChange={this.handleChange} />
          </div>
          <div>
            <select name="bathymetry" value={this.state.bathymetry} onChange={this.handleChange} >
                <option value="sand">Sand</option>
                <option value="reef">Reef</option>
                <option value="sand-reef">Sand And Reef</option>
            </select>
          </div>
          <div>
            <select name="wavetype" value={this.state.wavetype} onChange={this.handleChange} >
                <option value="beachbreak">Beach Break</option>
                <option value="reefbreak">Reef Break</option>
                <option value="pointbreak">Point Break</option>
            </select>
          </div>
          <div>
            <select name="wavelandmarks" value={this.state.landmarks} onChange={this.handleChange} >
                <option value="beachbreak">Beach Break</option>
                <option value="reefbreak">Reef Break</option>
                <option value="pointbreak">Point Break</option>
            </select>
          </div>
          <div>
            <p>Wave Length:</p>
            <input name="wavelength" type="range" min="1" max="100" value={this.state.wavelength} className="value-slider" id="length-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>Wave Quality:</p>
            <input name="wavequality" type="range" min="1" max="100" value={this.state.wavequality} className="value-slider" id="quality-slider" onChange={this.handleChange} />
          </div>
          <div>
            <select name="wavedirection" value={this.state.direction} onChange={this.handleChange} >
                <option value="right">Right</option>
                <option value="left">Left</option>
                <option value="rightleft">Right And Left</option>
            </select>
          </div>
          <div>
            <p>Wave Hollowness:</p>
            <input name="wavehollowness" type="range" min="1" max="100" value={this.state.wavehollowness} className="value-slider" id="hollowness-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>Wave Danger:</p>
            <input name="wavedanger" type="range" min="1" max="100" value={this.state.wavedanger} className="value-slider" id="danger-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>Wind Marker 1:</p>
            <input name="lowtide" type="range" min="1" max="100" value={this.state.lowtide} className="value-slider" id="lowtide-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>Wind Marker 2:</p>
            <input name="hightide" type="range" min="1" max="100" value={this.state.hightide} className="value-slider" id="hightide-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>Low Tide:</p>
            <input name="lowtide" type="range" min="1" max="100" value={this.state.lowtide} className="value-slider" id="lowtide-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>High Tide:</p>
            <input name="hightide" type="range" min="1" max="100" value={this.state.hightide} className="value-slider" id="hightide-slider" onChange={this.handleChange} />
          </div>
          <button onClick={this.handleSubmit} />
        </form>
        <Map></Map>
      </div>
    )
  }
}
const MUTATION = gql`
mutation AddSpot($name: String, $nickname: String, $description: String, $directions: String, $bathymetry: String, $wavetype: String, $wavelength: Int, $wavequality: Int, $wavedirection: String, $wavedanger: Int, $wavehollowness: Int, $lowtide: Int, $hightide: Int, $datecreated: bigint) {
  insert_Waves(objects: {name: $name, nickname: $nickname, description: $description, directions: $directions, bathymetry: $bathymetry, wavetype: $wavetype, wavelength: $wavelength, wavequality: $wavequality, wavedirection: $wavedirection, wavehollowness: $wavehollowness, wavedanger: $wavedanger, lowtide: $lowtide, hightide: $hightide, datecreated: $datecreated}) {
    returning {
      name,
      nickname,
      description,
      directions,
      bathymetry,
      wavetype,
      wavelength,
      wavequality,
      wavedirection,
      wavehollowness,
      wavedanger,
      lowtide,
      hightide,
      datecreated
    }
  }
}
`
export default graphql(MUTATION)(AddSpot)
