import { LOAD_ALLUSERS_SUCCESS_ACTION } from "./action"



const initialState = {
    allUsersList: []
}

const allUsersListReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALLUSERS_SUCCESS_ACTION:
            return {
                allUsersList: action.allUsersInfo
            }
        default:
            return state
    }
}

export default allUsersListReducer;