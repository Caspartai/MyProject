import axios from "axios";

export const LOAD_NOTIFICATION_SUCCESS_ACTION = 'LOAD_NOTIFICATION_SUCCESS_ACTION';
export const LOAD_NOTIFICATION_FAILURE_ACTION = 'LOAD_NOTIFICATION_FAILURE_ACTION';
export const UPDATE_NOTIFICATION_ACTION = 'UPDATE_NOTIFICATION_ACTION';


export function updateNotificationAction(updatedNoti){
    return {
        type:UPDATE_NOTIFICATION_ACTION,
        updatedNoti:updatedNoti
    }
}


export function loadNotificationSuccessAction(notiList){
    return {
        type:LOAD_NOTIFICATION_SUCCESS_ACTION,
        notiList:notiList
    }
}

export function loadNotificationFailureAction(){
    return {
        type:LOAD_NOTIFICATION_FAILURE_ACTION,

    }
}

export function loadNotiThunk(username){
    return async (dispatch)=>{
        let token = localStorage.getItem('token');
        try {
            let notiReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/user/notifications/'+username,
                headers:{Authorization:`Bearer ${token}`}
            })
            //console.log('load notification Req',notiReq);
            dispatch(loadNotificationSuccessAction(notiReq.data));
        } catch (error) {
            console.log('get Notification error',error);
            dispatch(loadNotificationFailureAction());
        }
    }
}
