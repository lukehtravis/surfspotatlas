export const ALL_WAVES = "{ Waves { name id description } }"
export const LOGIN = "{ Users { username password } }"
export const FETCH_WAVE = "query FetchWave($id: Int) { Waves(where: {id: {_eq: $id}}) { id name datecreated createdby bathymetry description directions locationid nickname photosid wavedirection wavelandmarks wavetype } }"
export const ADD_SPOT = "mutation AddSpot($name: String, $nickname: String, $description: String, $directions: String, $bathymetry: String, $wavetype: String, $wavedirection: String, $wavelandmarks: String, $datecreated: bigint) { insert_Waves(objects: {name: $name, nickname: $nickname, description: $description, directions: $directions, bathymetry: $bathymetry, wavetype: $wavetype, wavedirection: $wavedirection, wavelandmarks: $wavelandmarks, datecreated: $datecreated}) { returning { id, name, nickname, description, directions, bathymetry, wavetype, wavedirection, wavelandmarks, datecreated, locationid } } }"
export const INSERT_LOCATION = "mutation InsertLocation($id: Int, $longitude: numeric, $latitude: numeric, $continent: String, $country: String, $region: String, $area: String ){ insert_Locations(objects: {id: $id, longitude: $longitude, latitude: $latitude, continent: $continent, country: $country, region: $region, area: $area }) { returning { id, longitude, latitude, continent, country, region, area } } }"
export const FETCH_LOCATION = "query FetchLocation($id: Int) { Locations(where: {id: {_eq: $id}}) { id, longitude, latitude } }"
export const WAVE_QUALITY = "query WaveQuality($id: Int) {  Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) {    aggregate {      avg {        wavequality      }    }  } }"
export const WAVE_HOLLOWNESS = "query WaveHollowness($id: Int) {  Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) {    aggregate {      avg {        wavehollowness      }    }  } }"
export const WAVE_DANGER = "query WaveDanger($id: Int) {  Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) {    aggregate {      avg {        wavedanger      }    }  } }"
export const ADD_RATING = "mutation AddRating($waveid: bigint, $wavelength: Int, $wavequality: Int, $wavehollowness: Int, $wavedanger: Int, $userid: Int, $windangleone: Int, $windangletwo: Int, $lowtide: Int, $hightide: Int, $waveseasonstart: Int, $waveseasonend: Int) { insert_Wave_Ratings(objects: {waveid: $waveid, wavelength: $wavelength, wavequality: $wavequality, wavehollowness: $wavehollowness, wavedanger: $wavedanger, userid: $userid, windangleone: $windangleone, windangletwo: $windangletwo, lowtide: $lowtide, hightide: $hightide, waveseasonstart: $waveseasonstart, waveseasonend: $waveseasonend}) { returning { waveid, wavelength, wavequality, wavedanger, wavehollowness, windangleone, windangletwo, lowtide, hightide, waveseasonstart, waveseasonend} } }"
export const FETCH_AREA_LOCATION_DATA = "query getSpotsByArea($areaName: String) { Locations(where: {area: {_eq: $areaName}}) { latitude longitude id } }"
export const FETCH_SPOT_FROM_LOCATIONID = "query getSpotsByLocationId($locationId: Int) { Waves(where: {locationid: {_eq: $locationId}}) { name wavedirection wavetype } }"
export const FETCH_WAVE_QUALITY = "query fetchWaveQuality($id: bigint) { Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) { aggregate { avg { wavequality } } } }"
export const FETCH_WAVE_LENGTH = "query FetchWaveLength($id: Int) { Wave_Ratings_aggregate(where: {id: {_eq: $id}}) { aggregate { avg { wavelength } } } }"
export const FETCH_WIND_ANGLES = "query FetchWindAngles($id: Int) { Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) { aggregate { avg { windangleone windangletwo } } } }"
export const FETCH_TIDES = "query FetchTides($id: bigint) { Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) { aggregate { avg { lowtide, hightide } } } }"
export const FETCH_CHOSEN_AREAS = "query FetchChosenAreas($listOfAreas: [Int]) { Locations(where: {id: {_in: $listOfAreas}}) { id longitude latitude area region country continent } }"
