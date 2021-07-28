import { SOCKET_CONNECT_FAILURE_ACTION, SOCKET_CONNECT_SUCCESS_ACTION } from "./action"


const initialState = {
    webSocket:null
}

const socketReducer = (state=initialState,action)=>{
    switch(action.type){
        case SOCKET_CONNECT_SUCCESS_ACTION:
            return {
                webSocket:action.webSocket
            }
        case SOCKET_CONNECT_FAILURE_ACTION:
        default:
            return state
    }
}

export default socketReducer;