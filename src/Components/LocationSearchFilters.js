import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_LOCATION_CATEGORIES} from "../utils/queries";

class LocationSearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // Logic to define state based on orientation of dropdowns
    if (value != "select") {
      if (name == "continent") {
        this.setState({
          [name]: value,
          country: undefined,
          region: undefined,
          area: undefined
        });
      }
      if (name == "country") {
        this.setState({
          [name]: value,
          region: undefined,
          area: undefined
        });
      }
      if (name == "region") {
        this.setState({
          [name]: value,
          area: undefined
        });
      }
      if (name == "area") {
        this.setState({
          [name]: value,
        });
      }
    } else {
      if (name == "continent") {
        this.setState({
          continent: undefined,
          country: undefined,
          region: undefined,
          area: undefined
        })
      }
      if (name == "country") {
        this.setState({
          country: undefined,
          region: undefined,
          area: undefined
        })
      }
      if (name == "region") {
        this.setState({
          region: undefined,
          area: undefined
        })
      }
      if (name == "area") {
        this.setState({
          area: undefined
        })
      }
    }
  }

  render() {
    if (!this.props.data.continents) {
      return "Loading..."
    }
    // Store props in seperate vars to avoid mutating state (props) directly
    let continents = this.props.data.continents;
    let countries = this.props.data.countries;
    let regions = this.props.data.regions;
    let areas = this.props.data.areas;
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
    return (
      <form>
        <div>
          <select name="continent" onChange={this.handleChange} >
            <option value="select">Select</option>
            {continents.map((continent) => {
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

export default graphql(gql`${FETCH_LOCATION_CATEGORIES}`)(LocationSearchFilters);
