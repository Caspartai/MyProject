import { LOAD_PROFILE_FAILURE_ACTION, LOAD_PROFILE_SUCCESS_ACTION, UPDATE_PROFILE_FAILURE_ACTION, UPDATE_PROFILE_SUCCESS_ACTION } from "./action"



const initialState = {
    userInfo: {}
}

const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PROFILE_SUCCESS_ACTION:
            return {
                userInfo: action.userInfo
            }
        case UPDATE_PROFILE_SUCCESS_ACTION:
            return {
                userInfo: action.userInfo
            }
        case LOAD_PROFILE_FAILURE_ACTION:
        case UPDATE_PROFILE_FAILURE_ACTION:
        default:
            return state


    }
}

export default userInfoReducer