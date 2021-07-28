import { LOAD_NOTIFICATION_FAILURE_ACTION, LOAD_NOTIFICATION_SUCCESS_ACTION, UPDATE_NOTIFICATION_ACTION } from "./action"


const initialState = {
    notiList:[]
}
const notiListReducer = (state=initialState,action)=>{
    switch(action.type){
        case UPDATE_NOTIFICATION_ACTION:
            let newNotiList = state.notiList.filter((noti)=>noti.id!==action.updatedNoti.id);
            newNotiList.push(action.updatedNoti);
            newNotiList.sort((a,b)=>{
                if(a.created_at<b.created_at){
                    return 1;
                }else{
                    return -1;
                }
            })
            return {
                notiList:newNotiList
            }
        case LOAD_NOTIFICATION_SUCCESS_ACTION:
            return {
                notiList:action.notiList
            }
        case LOAD_NOTIFICATION_FAILURE_ACTION:
        default:
            return state;
    }
}
export default notiListReducer;