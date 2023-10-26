query FetchWave($id: Int) {
Waves(where: {id: {_eq: $id}}) {
  bathymetry
  createdby
  datecreated
  description
  directions
  id
  locationid
  name
  nickname
  photosid
  wavedirection
  wavelandmarks
  wavetype
}
Locations(where: {id: {_eq: $id}}) {
  area
  continent
  country
  id
  latitude
  longitude
  region
}
}



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

query FetchSearchedSpots($searchedSpotsList: [Int], $waveQualityLow: Int, $waveQualityHigh: Int, $waveDangerLow: Int, $waveDangerHigh: Int) {
  Waves(where: {locationid: {_in: $searchedSpotsList}}) {
    name
    wavedirection
    wavetype
    id
    Wave_Ratings_aggregate(where: {wavequality: {_gte: $waveQualityLow, _lte: $waveQualityHigh}, wavedanger: {_gte: $waveDangerLow, _lte: $waveDangerHigh}}) {
      nodes {
        wavequality
        wavedanger
      }
    }
  }
}
