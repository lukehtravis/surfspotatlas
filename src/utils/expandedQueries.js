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
