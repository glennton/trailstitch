const makeGoogleMapRoute = (trackData, indexStart, indexEnd ) => {
  let dayTracks = []
  for (let i = indexStart; i <= indexEnd; i++) {
    const lat = Number.parseFloat( trackData[i]['@_lat'] )
    const lon = Number.parseFloat( trackData[i]['@_lon'] )
    dayTracks.push({ lat: lat, lng: lon })
  }
  return dayTracks
}

export default makeGoogleMapRoute