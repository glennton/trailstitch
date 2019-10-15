import gpx1dot1 from 'Utils/mapUtils/GPXSchemasParsers/gpx1dot1'

const normalizeGPXData = (data) => {
  let parsedData = {
    info: null,
    track: null,
    name: null,
  }

  const removeEmptyValues = (obj) => {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "object") {
        removeEmptyValues(value);
      } else if (!value && value !== 0) {
        delete obj[key];
      }
    }
    return obj
  }

  removeEmptyValues(data)
  if (data['@_xmlns'] && data['@_xmlns'] === 'http://www.topografix.com/GPX/1/1'){
    parsedData.info = removeEmptyValues(gpx1dot1.info(data))
    parsedData.name = removeEmptyValues(data.trk.name)
    parsedData.track = removeEmptyValues(data.trk.trkseg.trkpt)
  }else{
    throw new Error('Invalid File Format')
  }
  return parsedData
}

export default normalizeGPXData