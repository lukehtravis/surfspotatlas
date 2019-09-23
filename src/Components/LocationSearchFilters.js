import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_LOCATION_CATEGORIES} from "../utils/queries";

// This component gets all Continents -> Countries -> Regions -> Areas in
// initial apollo graphql query
// Then stores results of query in variables that correspond to a level of the
// location heirarchy
// It iterates through those variables to create a resposive dropdown system,
// which is executed in handleChange.
// The areas that eventually get selected are sent back up to the SearchFilters component
// via this.props.handleAreaChange(value)

class LocationSearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    // We know there will never be two values for continent, country, & region,
    // so we can set value like this for them
    let value = target.value
    // Users will sometimes choose multiple areas, so we use this logic to create
    // a value array if the area dropdown is manipulated
    if (name == "area") {
      var options = target.options;
      var areaVal = []
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          areaVal.push(options[i].value);
        }
      }
      value = areaVal;
    }
    // Logic to define state based on orientation of dropdowns. Users are supposed
    // to fill the dropdowns out in order, so if they reset a dropdown higher up
    // the order (ie. continent), we need to reset the state and ui for all
    // dropdowns below it
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
        this.props.handleAreaChange(value)
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
      areas = areas.filter((area) => area.region == this.state.region).map((area) => area.area);
    } else {
      areas = []
    }
    return (
      <div>
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
          <select name="area" multiple={true} onChange={this.handleChange} >
            <option value="select">Select</option>
            {areas.map((area) => {
              return <option value={area}>{area}</option>
            })}
          </select>
        </div>
      </div>
    )
  }
}

export default graphql(gql`${FETCH_LOCATION_CATEGORIES}`)(LocationSearchFilters);
