import db from './database'
import graphQL from './graphQL'
const api = (app)=>{
  //Start DB
  db()
    .then(_ => graphQL(app))    
    .catch( err => console.log(err) )
}

export default api