const URI = `mongodb://ds161335.mlab.com:61335/trailstitch`

const OPTIONS = {
  autoReconnect: true,
  reconnectTries: 1000000,
  reconnectInterval: 3000,
  useNewUrlParser: true
}

export {URI, OPTIONS}