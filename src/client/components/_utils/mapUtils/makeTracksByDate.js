const makeTracksByDate = (daysArr, trackData) => {
  return daysArr.map((e) => {
    const { indexStart, indexEnd } = e
    let dayTracks = []
    for (let i = indexStart; i <= indexEnd; i++) {
      const lat = Number.parseFloat(trackData[i]['@_lat'])
      const lng = Number.parseFloat(trackData[i]['@_lon'])
      const ele = Number.parseFloat(trackData[i]['ele'])
      const time = trackData[i]['time']
      dayTracks.push({ lat: lat, lng: lng, ele: ele, time: time  })
    }
    return Object.assign(e, { track: dayTracks })
  })
}

export default makeTracksByDate