//import Model from './Model.js'

const resolvers = {
  Query: {
    async getUsers(){
      try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const json = await response.json()
        return json
      }catch(err){
        return err
      }
    }
  }
}

export default resolvers