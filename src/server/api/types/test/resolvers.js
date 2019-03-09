//import Model from './Model.js'
import fetch from 'node-fetch'

const resolvers = {
  Query: {
    async getUser(obj, params, context, info){
      try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.num}`)
        const json = await response.json()
        return json
      }catch(err){
        return err
      }
    },
    async getAllUsers(obj, params, context, info){
      try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/`)
        const json = await response.json()
        return json
      }catch(err){
        return err
      }
    }
  }
}

export default resolvers