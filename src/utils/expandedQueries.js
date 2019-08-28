query FetchWave($id: Int) {
  Waves(where: {id: {_eq: $id}}) {
    id
    name
    datecreated
    createdby
    bathymetry
    description
    directions
    hightide
    locationid
    lowtide
    nickname
    photosid
    region
    wavedanger
    wavedirection
    wavehollowness
    wavelandmarks
    wavelength
    wavequality
    waveseasonend
    waveseasonstart
    wavetype
    windangleone
    windangletwo
  }
}

query WaveQuality($id: Int) {
  Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) {
    aggregate {
      avg {
        wavequality
      }
    }
  }
}

query FetchLocation($id:Int) {
  Locations(where: {id: {_eq: $id}}) {
    id
  }
}

query WaveHollowness($id: Int) {
  Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) {
    aggregate {
      avg {
        wavehollowness
      }
    }
  }
}

query WaveDanger($id: Int) {
  Wave_Ratings_aggregate(where: {waveid: {_eq: $id}}) {
    aggregate {
      avg {
        wavedanger
      }
    }
  }
}

mutation InsertLocation($id: Int, $longitude: numeric, $latitude: numeric, $continent: String, $country: String, $region: String, $area: String ){
  insert_Locations(objects: {id: $id, longitude: $longitude, latitude: $latitude, continent: $continent, country: $country, region: $region, area: $area }) {
    returning {
      id,
      longitude,
      latitude,
      continent,
      country,
      region,
      area
    }
  }
}
