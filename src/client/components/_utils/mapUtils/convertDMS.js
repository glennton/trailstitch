//Accepts coordinates as (lat, lng)
const toDegreesMinutesAndSeconds = (coordinate) => {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
  return `${degrees}|${minutes}|${seconds}`
}

const convertDMS = (lat, lng) => {
  if (lat && lng && typeof(lat) === 'number' && typeof(lng) === 'number') {
    const latitude = toDegreesMinutesAndSeconds(lat);
    const latitudeCardinal = Math.sign(lat) >= 0 ? "N" : "S";

    const longitude = toDegreesMinutesAndSeconds(lng);
    const longitudeCardinal = Math.sign(lng) >= 0 ? "E" : "W";

    return {
      lat: `${latitude}|${latitudeCardinal}`,
      lng: `${longitude}|${longitudeCardinal}`
    }
  }else{
    return null
  }
}

export default convertDMS

//https://stackoverflow.com/questions/37893131/how-to-convert-lat-long-from-decimal-degrees-to-dms-format