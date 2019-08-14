export const ALL_WAVES = "{ Waves { name id description } }"
export const LOGIN = "{ Users { username password } }"
export const FETCH_WAVE = "query FetchWave($id: Int) { Waves(where: {id: {_eq: $id}}) { id name datecreated createdby bathymetry description directions hightide locationid lowtide nickname photosid region wavedanger wavedirection wavehollowness wavelandmarks wavelength wavequality waveseasonend waveseasonstart wavetype windangleone windangletwo } }"
export const WAVE_QUALITY = "query WaveQuality($id: Int) {  Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) {    aggregate {      avg {        wavequality      }    }  } }"
