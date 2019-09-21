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
    console.log("event", event);
    console.log("event target", event.target)
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (value != "select") {
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        [name]: undefined
      })
    }
  }

  render() {
    if (!this.props.data.continents) {
      return "Loading..."
    }
    // Store props in seperate vars to avoid mutating state (props) directly
    let countries = this.props.data.countries;
    let regions = this.props.data.regions;
    let areas = this.props.data.areas;
    console.log("countries", countries, "regions", regions, "area", areas, "reactState = ", this.state)
    if (this.state.continent) {
      countries = countries.filter((country) => country.continent == this.state.continent)
    } else {
      countries = []
    }
    if (this.state.continent && this.state.country) {
      regions = regions.filter((region) => region.country == this.state.country)
    } else {
      regions = []
    }
    if (this.state.continent && this.state.country && this.state.region) {
      areas = areas.filter((area) => area.region == this.state.region)
    } else {
      areas = []
    }
    console.log("countries", countries, "regions", regions, "area", areas, "reactState = ", this.state)
    return (
      <form>
      <div>
        <select name="continent" onChange={this.handleChange} >
          <option value="select">Select</option>
          {this.props.data.continents.map((continent) => {
            return <option onClick={this.handleChange} value={continent.continent}>{continent.continent}</option>
          })}
        </select>
      </div>
      <div>
        <select name="country" onChange={this.handleChange} >
          <option value="select">Select</option>
          {
            countries.map((country) => {
              return <option value={country.country}>{country.country}</option>
            })
          }
        </select>
      </div>
      <div>
        <select name="region" onChange={this.handleChange} >
          <option value="select">Select</option>
          {regions.map((region) => {
            return <option value={region.region}>{region.region}</option>
          })}
        </select>
      </div>
      <div>
        <select name="area" onChange={this.handleChange} >
          <option value="select">Select</option>
          {areas.map((area) => {
            return <option value={area.area}>{area.area}</option>
          })}
        </select>
      </div>
      </form>
    )
  }
}

export default graphql(gql`${FETCH_LOCATION_CATEGORIES}`)(SearchFilters);
