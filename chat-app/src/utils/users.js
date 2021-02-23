const { use } = require("../app")

const users = []

const addUser = ({id, username, room}) => {

    console.log("here")
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!username || !room) {
        return {
            error: 'Username and room are required'
        }
    }

    // Check for existing user
    const exisingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    if (exisingUser) {
        return {
            error: 'Username is in use'
        }
    }
    
    const user = { id, username, room }
    console.log(JSON.stringify(user))
    users.push(user)
    return({user})
}

const removeUser = (id) => {

    const index = users.findIndex((user) => {
        return user.id === id
    })

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((id) => user.id === id)    
}

const getUsersInRoom = (room) => {
    return users.filter((user) => {
        user.room == room
    })
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}