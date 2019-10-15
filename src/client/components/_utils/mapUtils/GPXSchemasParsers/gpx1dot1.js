const gpx1dot1 = {
  info(data){
    const info = data.trk.extensions['gpxtrkx:TrackStatsExtension']
    const parsedInfo = {
      Ascent: info['gpxtrkx:Ascent'] || '',
      AvgAscentRate: info['gpxtrkx:AvgAscentRate'] || '',
      AvgDescentRate: info['gpxtrkx:AvgDescentRate'] || '',
      Descent: info['gpxtrkx:Descent'] || '',
      Distance: info['gpxtrkx:Distance'] || '',
      MaxAscentRate: info['gpxtrkx:MaxAscentRate'] || '',
      MaxDescentRate: info['gpxtrkx:MaxDescentRate'] || '',
      MaxElevation: info['gpxtrkx:MaxElevation'] || '',
      MaxSpeed: info['gpxtrkx:MaxSpeed'] || '',
      MinElevation: info['gpxtrkx:MinElevation'] || '',
      MovingSpeed: info['gpxtrkx:MovingSpeed'] || '',
      MovingTime: info['gpxtrkx:MovingTime'] || '',
      StoppedTime: info['gpxtrkx:StoppedTime'] || '',
      TotalElapsedTime: info['gpxtrkx:TotalElapsedTime'] || '',
    }
    return parsedInfo
  }
}

export default gpx1dot1

