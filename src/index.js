let STATE_room = undefined
let STATE_user = undefined
let STATE_userType = undefined
let STATE_round = undefined
const rootEl = document.querySelector('#root')
const footerEl = document.querySelector('#footer')

document.addEventListener('DOMContentLoaded', () => { 
    drawRoomOptions()
})

const update = () => {
    gameRouter()
    if (STATE_room){ API.getRoom(STATE_room).then(storeRoom) }
}

// route the game correctly =====
const gameRouter = () => {
    if (STATE_room === undefined) {
       // drawRoomOptions()
    } else {
        drawRoomLobby()
        drawUsersBar(STATE_room.users)
    }
}
setInterval(update, 1000)
// =====



const addNewUser = (name, roomCode) => {
    return API.joinRoom(name, roomCode)
    .then(storeUser)
}

const storeRoom = room => STATE_room = room

const clearRoomState = () => STATE_room = undefined

const storeUser = user => STATE_user = user


const setRoomStatus = (room, status) => {
    room.status = status
    return API.updateRoom(room)
}
