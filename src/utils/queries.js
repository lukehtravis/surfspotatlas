export const ALL_WAVES = "{ Waves { name id description } }";
export const LOGIN = "{ Users { username password } }";
// export const FETCH_WAVE = "query FetchWave($id: Int) { Waves(where: {id: {_eq: $id}}) { id name datecreated createdby bathymetry description directions locationid nickname photosid wavedirection wavelandmarks wavetype } Locations { country region area } }"
export const FETCH_WAVE =
  "query FetchWave($id: Int) {Waves(where: {id: {_eq: $id}}) {  bathymetry  createdby  datecreated  description  directions  id  locationid  name  nickname  photosid  wavedirection  wavelandmarks  wavetype}Locations(where: {locationId: {_eq: $id}}) {  area  continent  country  id  latitude  longitude  region}}";
export const ADD_SPOT =
  "mutation AddSpot($name: String, $nickname: String, $description: String, $directions: String, $bathymetry: String, $wavetype: String, $wavedirection: String, $wavelandmarks: String, $datecreated: timestamptz, $createdby: String) { insert_Waves_one(object: {name: $name, nickname: $nickname, description: $description, directions: $directions, bathymetry: $bathymetry, wavetype: $wavetype, wavedirection: $wavedirection, wavelandmarks: $wavelandmarks, datecreated: $datecreated, createdby: $createdby}) { id, name, nickname, description, directions, bathymetry, wavetype, wavedirection, wavelandmarks, datecreated, locationid, createdby } }";
export const INSERT_LOCATION =
  "mutation InsertLocation($locationId: Int, $longitude: numeric, $latitude: numeric, $continent: String, $country: String, $region: String, $area: String ){ insert_Locations_one(object: {locationId: $locationId, longitude: $longitude, latitude: $latitude, continent: $continent, country: $country, region: $region, area: $area }) { id, longitude, latitude, continent, country, region, area } }";
export const FETCH_LOCATION =
  "query FetchLocation($locationId: Int) { Locations(where: {locationId: {_eq: $locationId}}) { id, locationId, longitude, latitude, area, region, country, continent } }";
export const WAVE_QUALITY =
  "query WaveQuality($id: Int) {  Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) {    aggregate {      avg {        wavequality      }    }  } }";
export const WAVE_HOLLOWNESS =
  "query WaveHollowness($id: Int) {  Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) {    aggregate {      avg {        wavehollowness      }    }  } }";
export const WAVE_DANGER =
  "query WaveDanger($id: Int) {  Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) {    aggregate {      avg {        wavedanger      }    }  } }";
export const ADD_RATING =
  "mutation AddRating($waveid: Int, $wavelength: Int, $wavequality: Int, $wavehollowness: Int, $wavedanger: Int, $wavecrowd: Int, $userid: String, $windangleone: Int, $windangletwo: Int, $lowtide: Int, $hightide: Int, $waveseasonstart: Int, $waveseasonend: Int, $swellangleone: Int, $swellangletwo: Int) { insert_Wave_Ratings_one(object: {waveid: $waveid, wavelength: $wavelength, wavequality: $wavequality, wavehollowness: $wavehollowness, wavedanger: $wavedanger, wavecrowd: $wavecrowd, userid: $userid, windangleone: $windangleone, windangletwo: $windangletwo, lowtide: $lowtide, hightide: $hightide, waveseasonstart: $waveseasonstart, waveseasonend: $waveseasonend, swellangleone: $swellangleone, swellangletwo: $swellangletwo}) { waveid, wavelength, wavequality, wavedanger, wavecrowd, wavehollowness, windangleone, windangletwo, lowtide, hightide, waveseasonstart, waveseasonend, userid, swellangleone, swellangletwo } }";
export const FETCH_AREA_LOCATION_DATA =
  "query getSpotsByArea($areaName: String) { Locations(where: {area: {_eq: $areaName}}) { latitude longitude id country region locationId Wave { name Wave_Ratings_aggregate { aggregate { avg { wavequality wavedanger } } } bathymetry wavedirection id } } } ";
export const FETCH_SPOT_FROM_LOCATIONID =
  "query getSpotsByLocationId($locationId: Int) { Waves(where: {id: {_eq: $locationId}}) { name wavedirection wavetype } }";
export const FETCH_WAVE_QUALITY =
  "query fetchWaveQuality($id: Int) { Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) { aggregate { avg { wavequality } } } }";
export const FETCH_WAVE_LENGTH =
  "query FetchWaveLength($id: Int) { Wave_Ratings_aggregate(where: {id: {_eq: $id}}) { aggregate { avg { wavelength } } } }";
export const FETCH_WIND_ANGLES =
  "query FetchWindAngles($id: Int) { Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) { aggregate { avg { windangleone windangletwo } } } }";
export const FETCH_TIDES =
  "query FetchTides($id: Int) { Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) { aggregate { avg { lowtide, hightide } } } }";
export const FETCH_LOCATION_CATEGORIES =
  "query FetchLocationCategories { continents: Locations(distinct_on: continent) { continent } countries: Locations(distinct_on: country) { continent country } regions: Locations(distinct_on: region) { country region } areas: Locations(distinct_on: area) { region area } }";
export const FETCH_SEARCHED_SPOTS =
  "query FetchSearchedSpots($listOfAreas: [String], $waveQualityLow: Int, $waveQualityHigh: Int, $waveDangerLow: Int, $waveDangerHigh: Int){ Locations(where: {area: {_in: $listOfAreas}}, order_by: {latitude: desc, area: asc}) { Wave { name id bathymetry wavedirection wavetype Wave_Ratings_aggregate(where: {wavequality: {_gte: $waveQualityLow, _lte: $waveQualityHigh}, wavedanger: {_lte: $waveDangerHigh, _gte: $waveDangerLow}}) { aggregate { avg { wavedanger wavequality } } } } latitude, longitude } }";
export const FETCH_WAVE_ATTRIBUTES =
  "query FetchWaveAttributes($id:Int){ Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) { aggregate { avg { hightide lowtide swellangleone swellangletwo wavecrowd wavedanger wavehollowness waveid wavelength wavequality waveseasonend waveseasonstart windangleone windangletwo } } }}";
export const INSERT_WAVE_IMAGE =
  "mutation AddWaveImage($waveid: Int, $name: String, $url: String, $type: String, $creator: String, $datecreated: timestamptz) { insert_Wave_Images(objects: {waveid: $waveid, name: $name, url: $url, type: $type, creator: $creator}) { returning { id, waveid, name, url, type, creator, datecreated } } }";
export const FETCH_WAVE_IMAGES =
  "query FetchWaveImages($waveid: Int) { Wave_Images(where: {waveid: {_eq: $waveid}}) { id, url } }";
export const DELETE_WAVE =
  "mutation deleteWave($id: Int) { delete_Waves(where: {id: {_eq: $id}}) { returning { name id } } }";
export const DELETE_WAVE_RATINGS =
  "mutation deleteWaveRatings($waveId: Int) { delete_Wave_Ratings(where: {waveid: {_eq: $waveId}}) { returning { id } } }";
export const DELETE_LOCATION =
  "mutation deleteLocations($waveId: Int) { delete_Locations(where: {Wave: {id: {_eq: $waveId}}}) { returning { latitude longitude area continent country region } } }";
