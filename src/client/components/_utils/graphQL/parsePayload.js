export default (payloadArr = [], typeToReturn) => {
  let obj
  payloadArr.map(( payload ) => {      
    if (payload.type === typeToReturn) { obj = payload }
  })
  return obj ? obj : false
}