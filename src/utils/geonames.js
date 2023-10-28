/*

  This is the function used in Map.js to create a place heirarchy to be inserted in the Locations
  table for each Wave (represented in Wave table by the location Id).

  The onChangeCoords function changes the state in the AddSpot.js component
  The stateObj.setState call changes the state in the Map.js component

  There is currently a problem where on rare occasions, the thennable jsonObject returned
  is missing the "Area" level of the heirarchy, in which case, we can't populate that piece
  of the database, so the user is asked to select a different area. A solution needs to be
  developed for this exception. Usually this only happens in very lowly populated areas.

*/

export const geonamesLocations = (geonamesUrl, stateObj, event) => {
  fetch(geonamesUrl)
  .then(promiseObject => promiseObject.json())
  .then(jsonObject => {
    stateObj.props.onChangeCoords(
      event.lngLat[0],
      event.lngLat[1],
      jsonObject.geonames[1].name/*Continent*/,
      jsonObject.geonames[2].name/*Country*/,
      jsonObject.geonames[3].name/*Region*/,
      jsonObject.geonames[4].name/*Area*/
    )
    stateObj
    .setState({
      continent: jsonObject.geonames[1].name,
      country: jsonObject.geonames[2].name,
      region: jsonObject.geonames[3].name,
      area: jsonObject.geonames[4].name
    })
  })
  .catch(error => {
    console.log(error)
    alert("try again that click failed. It doesn't always work if you've clicked on a piece of ocean. Try clicking on the nearest piece of land next to a wave")
    stateObj.setState({
      continent: "",
      country: "",
      region: "",
      area: ""
    })
  })
}

export const GEONAME_LOGIN = "surfspotatlas";
