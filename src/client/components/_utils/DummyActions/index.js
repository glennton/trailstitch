import DummyData from 'Utils/DummyData'

//publicUsers, slides, pageNavItems
const { publicUsers, } = DummyData

const actions = {
  getUserById: (id) => {
    return publicUsers.find(user => user.publicUserId === id)
  }
}

export default actions;
