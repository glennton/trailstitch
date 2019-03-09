import db from './database'
import graphQL from './graphQL'

const api = async app => {
  try{
    await db()
    graphQL(app)
  }catch(err){
    console.log(err)
  }
}

export default api