export const ALL_WAVES = "{ Waves { name description } }"
export const LOGIN = "{ Users { username password } }"
export const FETCH_WAVE = "query FetchWave($id: Int) { Waves(where: {id: {_eq: $id}}) { id name datecreated createdby bathymetry description directions hightide locationid lowtide nickname photosid region wavedanger wavedirection wavehollowness wavelandmarks wavelength wavequality waveseasonend waveseasonstart wavetype windangleone windangletwo } }"
