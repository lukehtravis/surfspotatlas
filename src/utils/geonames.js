export const geonamesLocations = (geonamesUrl, stateObj) => {
  fetch(geonamesUrl)
  .then(promiseObject => promiseObject.json())
  .then(jsonObject => stateObj
    .setState({
      continent: jsonObject.geonames[1].name,
      country: jsonObject.geonames[2].name,
      region: jsonObject.geonames[3].name,
      area: jsonObject.geonames[4].name
    })
  )
  .catch(error => {
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
