import BigNumber from "bignumber.js"

const getElevationGainLoss = (ele1, ele2) => {
  const difference = new BigNumber(ele1).minus(ele2).toNumber() //Get difference
  const absChange = Math.abs(difference) //Get absolute value of change

  let change = { ascent: 0, descent: 0 }
  if (absChange && difference > 0) {
    change.ascent = absChange
  } else {
    change.descent = absChange
  }
  return change
}

export default getElevationGainLoss

//https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript