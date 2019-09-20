import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_LOCATION_CATEGORIES} from "../utils/queries";

class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <div>
          <select name="continent" value={this.state.continent} onChange={this.handleChange} >
              <option value="sand">Sand</option>
              <option value="reef">Reef</option>
              <option value="sand-reef">Sand And Reef</option>
          </select>
        </div>
        <div>
          <select name="country" value={this.state.country} onChange={this.handleChange} >
              <option value="beachbreak">Beach Break</option>
              <option value="reefbreak">Reef Break</option>
              <option value="pointbreak">Point Break</option>
          </select>
        </div>
        <div>
          <select name="region" value={this.state.region} onChange={this.handleChange} >
              <option value="pier">Pier</option>
              <option value="jetty">Jetty</option>
              <option value="channel">Channel</option>
          </select>
        </div>
        <div>
          <select name="area" value={this.state.area} onChange={this.handleChange} >
              <option value="pier">Pier</option>
              <option value="jetty">Jetty</option>
              <option value="channel">Channel</option>
          </select>
        </div>
      </form>
    )
  }
}

export default graphql(gql`${FETCH_LOCATION_CATEGORIES}`)(SearchFilters);
