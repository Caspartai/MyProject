import { ADD_NEW_SCHEDULE_FAILURE_ACTION, ADD_NEW_SCHEDULE_SUCCESS_ACTION, LOAD_SCHEDULE_SUCCESS_ACTION } from "./action"


const initialState = {
    scheduleList:[]
}

const scheduleListReducer = (state=initialState,action)=>{
    switch(action.type){
        case LOAD_SCHEDULE_SUCCESS_ACTION:
            return {
                scheduleList:action.scheduleList
            }
        case ADD_NEW_SCHEDULE_SUCCESS_ACTION:
            return {
                scheduleList:[action.newSchedule,...state.scheduleList]
            }
        
        case ADD_NEW_SCHEDULE_FAILURE_ACTION:
        default:
            return state
    }
}

export default scheduleListReducer;