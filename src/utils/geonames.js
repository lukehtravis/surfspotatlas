export const geonamesLocations = (geonamesUrl, stateObj, event) => {
  fetch(geonamesUrl)
  .then(promiseObject => promiseObject.json())
  .then(jsonObject => {
    console.log("error", jsonObject)
    stateObj.props.onChangeCoords(event.lngLat[0], event.lngLat[1], jsonObject.geonames[1].name, jsonObject.geonames[2].name, jsonObject.geonames[3].name, jsonObject.geonames[4].name)
    stateObj
    .setState({
      continent: jsonObject.geonames[1].name,
      country: jsonObject.geonames[2].name,
      region: jsonObject.geonames[3].name,
      area: jsonObject.geonames[4].name
    })
  })
  .catch(error => {
    alert("try again that click failed. It doesn't always work if you've clicked on a piece of ocean. Try clicking on the nearest piece of land next to a wave")
    stateObj.setState({
      continent: "",
      country: "",
      region: "",
      area: ""
    })
    console.log(error)
  })
}

export const GEONAME_LOGIN = "surfspotatlas";
