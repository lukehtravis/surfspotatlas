export const geocodeCoordinates = (geonamesUrl, stateObj) => {
  fetch(geonamesUrl)
  .then(promiseObject => promiseObject.json())
  .then(jsonObject => stateObj.setState({country: jsonObject.countryName}))
}
