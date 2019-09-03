import React, {Component, Fragment} from 'react'
import { Query, graphql, Mutation} from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { compose } from 'react-apollo';
import Map from './Map';
import {ADD_SPOT, INSERT_LOCATION, ADD_RATING} from "../utils/queries"

class AddSpot extends Component {
  state = {
    lat: 0,
    long: 0
  }

  onChangeCoords = (long, lat, continent, country, region, area) => {
    this.setState({
      lat: lat,
      long: long,
      continent: continent,
      country: country,
      region: region,
      area: area
    })
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

    const returned = this.props.addSpot({
        variables: {
          name: this.state.name,
          nickname: this.state.nickname,
          description: this.state.description,
          directions: this.state.directions,
          bathymetry: this.state.bathymetry,
          wavetype: this.state.wavetype,
          wavedirection: this.state.wavedirection,
          wavelandmarks: this.state.wavelandmarks,
          datecreated: timestamp
        },
    }).then((graphqlObject) => {
      console.log("what is this", this)
      let locationId = graphqlObject.data.insert_Waves.returning[0].locationid
      let waveId = graphqlObject.data.insert_Waves.returning[0].id
      this.props.addRating({
        variables: {
          waveid: waveId,
          wavelength: this.state.wavelength,
          wavequality: this.state.wavequality,
          wavehollowness: this.state.wavehollowness,
          wavedanger: this.state.wavedanger,
          userid: 1,
          windangleone: this.state.windangleone,
          windangletwo: this.state.windangletwo,
          lowtide: this.state.lowtide,
          hightide: this.state.hightide,
          waveseasonstart: this.state.waveseasonstart,
          waveseasonend: this.state.waveseasonend
        }
      })
      this.props.insertLocation({
        variables: {
          id: locationId,
          longitude: this.state.long,
          latitude: this.state.lat,
          continent: this.state.continent,
          country: this.state.country,
          region: this.state.region,
          area: this.state.area
        }
      })
    })
  }


  render() {
    console.log(this.props)
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
            <select name="wavelandmarks" value={this.state.wavelandmarks} onChange={this.handleChange} >
                <option value="pier">Pier</option>
                <option value="jetty">Jetty</option>
                <option value="channel">Channel</option>
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
            <input name="windangleone" type="range" min="1" max="360" value={this.state.windangleone} className="value-slider" id="lowtide-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>Wind Marker 2:</p>
            <input name="windangletwo" type="range" min="1" max="360" value={this.state.windangletwo} className="value-slider" id="hightide-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>Low Tide:</p>
            <input name="lowtide" type="range" min="1" max="100" value={this.state.lowtide} className="value-slider" id="lowtide-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>High Tide:</p>
            <input name="hightide" type="range" min="1" max="100" value={this.state.hightide} className="value-slider" id="hightide-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>Wave Season Start:</p>
            <input name="waveseasonstart" type="range" min="1" max="365" value={this.state.waveseasonstart} className="value-slider" id="lowtide-slider" onChange={this.handleChange} />
          </div>
          <div>
            <p>High Tide:</p>
            <input name="waveseasonend" type="range" min="1" max="365" value={this.state.waveseasonend} className="value-slider" id="hightide-slider" onChange={this.handleChange} />
          </div>
          <button onClick={this.handleSubmit} />
        </form>
        <Map onChangeCoords={this.onChangeCoords} />
      </div>
    )
  }
}

export default compose(
  graphql(gql`${ADD_SPOT}`, {
    name: "addSpot"
  }),
  graphql(gql`${INSERT_LOCATION}`, {
    name: "insertLocation"
  }),
  graphql(gql`${ADD_RATING}`, {
    name: "addRating"
  })
)(AddSpot)
