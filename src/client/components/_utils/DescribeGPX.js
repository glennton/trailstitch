
const DescribeGPX = (data) => {
  return new Promise((resolve)=>{
    try{
      const newData = data.trk.trkseg.trkpt
      const waypointCount = newData.length
      let days = []
      let dayIndex = 0;
      newData.map((e, i) => {
        const key = e.time.split("T").shift()
        const nextKey = newData[i + 1] ? newData[i + 1].time.split("T").shift() : ''
        if(i===0){
          days.push({[key] : { 'startPoint': e, 'endPoint': {} }})
        }else{
          if (key != nextKey) {
            days[dayIndex][key]['endPoint'] = e
            if (i+1 < waypointCount){
              days.push({ [nextKey]: { 'startPoint': newData[i + 1], 'endPoint': {} } })
              dayIndex++
            }
          }
        }
      })
      resolve({ 
        days: days,
        dayCount: days.length,
        firstDay: newData[0]['time'],
        lastDay: newData[waypointCount - 1]['time'],
      })
    }catch(err){
      throw new Error('There was an issue reading data')
    }
  })

}

export default DescribeGPX