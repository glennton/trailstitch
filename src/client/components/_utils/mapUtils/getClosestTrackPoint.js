import getHaversineDistance from 'Utils/mapUtils/getHaversineDistance'

const getClosestTrackPoint = (track, coord) => { //coord as {lat:x, lng: y}
  if(coord.lat && coord.lng){
    const closestObject = {trackPoint : null, index: ''}
    let diff = null
    track.map((e, i) => {
      const { lat1, lng1 } = e
      const trackCoord = { lat: lat1, lng: lng1 }
      const newDiff = getHaversineDistance(trackCoord, coord)
      //if current difference is less than new difference, then set closest object
      if(newDiff < diff || diff === null){
        closestObject.trackPoint = e
        closestObject.index = i
      }
    })
  }else{
    throw new Error('Coordinate to compare is not valid')
  }
  return {closestPoint : '', closestIndex: ''}
}

export default getClosestTrackPoint

//https://stackoverflow.com/questions/21279559/geolocation-closest-locationlat-long-from-my-position