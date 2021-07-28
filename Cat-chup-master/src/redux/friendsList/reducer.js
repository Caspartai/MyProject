import { DELETE_FRIEND_SUCCESS_ACTION, LOAD_FRIEND_SUCCESS_ACTION, UPDATE_FRIEND_SUCCESS_ACTION } from "./action"


const initialState = {
    friendList:{}
}

const friendListReducer = (state=initialState,action)=>{
    switch(action.type){
        case DELETE_FRIEND_SUCCESS_ACTION:
        case LOAD_FRIEND_SUCCESS_ACTION:
        case UPDATE_FRIEND_SUCCESS_ACTION:
            return{
                friendList:action.friendList
            }
            
        default:
            return state
    }
}

export default friendListReducer