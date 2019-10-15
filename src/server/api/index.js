import DB from './database'
import graphQL from './graphQL'

const api = async app => {
  try{
    await DB()
    graphQL(app)
  }catch(err){
    console.log(err)
  }
}

export default api