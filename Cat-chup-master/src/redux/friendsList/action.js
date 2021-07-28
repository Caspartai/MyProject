import axios from "axios";
import { loadNotificationSuccessAction } from "../notification/action";

export const LOAD_FRIEND_SUCCESS_ACTION = 'LOAD_FRIEND_SUCCESS_ACTION';
export const LOAD_FRIEND_FAILURE_ACTION = 'LOAD_FRIEND_FAILURE_ACTION';
export const ADD_FRIEND_SUCCESS_ACTION = 'ADD_FRIEND_SUCCESS_ACTION';
export const ADD_FRIEND_FAILURE_ACTION = 'ADD_FRIEND_FAILURE_ACTION';
export const DELETE_FRIEND_SUCCESS_ACTION = 'DELETE_FRIEND_SUCCESS_ACTION';
export const DELETE_FRIEND_FAILURE_ACTION = 'DELETE_FRIEND_FAILURE_ACTION';
export const UPDATE_FRIEND_SUCCESS_ACTION = 'UPDATE_FRIEND_SUCCESS_ACTION';
export const UPDATE_FRIEND_FAILURE_ACTION = 'UPDATE_FRIEND_FAILURE_ACTION';

export function updateFriendSuccessAction(friendList){
    return {
        type:UPDATE_FRIEND_SUCCESS_ACTION,
        friendList:friendList
    }
}
export function updateFriendFailureAction(){
    return {
        type:UPDATE_FRIEND_FAILURE_ACTION,
    }
}


export function loadFriendSuccessAction(friendList) {
    return {
        type: LOAD_FRIEND_SUCCESS_ACTION,
        friendList: friendList
    }
}

export function loadFriendFailureAction() {
    return {
        type: LOAD_FRIEND_FAILURE_ACTION
    }
}

export function addFriendSuccessAction(friendList) {
    return {
        type: ADD_FRIEND_SUCCESS_ACTION,
        friendList: friendList
    }
}
export function addFriendFailureAction() {
    return {
        type: ADD_FRIEND_FAILURE_ACTION
    }
}
export function deleteFriendSuccessAction(friendList) {
    return {
        type: DELETE_FRIEND_SUCCESS_ACTION,
        friendList: friendList
    }
}
export function deleteFriendFailureAction() {
    return {
        type: DELETE_FRIEND_FAILURE_ACTION
    }
}

export function updateFriendThunk(newFriendList,username){
    return async (dispatch)=>{
        let token = localStorage.getItem('token');
        try {
            //console.log('in update friend thunk',newFriendList);
            await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/friends/'+username,
                method:'put',
                headers: { Authorization: `Bearer ${token}` },
                data:newFriendList
            })
           // console.log('update res',updateReq);
            dispatch(updateFriendSuccessAction(newFriendList))
        } catch (error) {
            console.log('update friend thunk error',error)
        }
    }
}

export function loadFriendThunk(username) {
    return async (dispatch) => {
        let token = localStorage.getItem('token');
        try {
            let friendReq = await axios({
                url: process.env.REACT_APP_API_SERVER + '/api/user/friends/' + username,
                headers: { Authorization: `Bearer ${token}` },
            })
            //console.log('load friend req', friendReq.data.friends_list);
            if (friendReq.data) {
                if (friendReq.data.friends_list) {
                    dispatch(loadFriendSuccessAction(friendReq.data.friends_list));
                } else {
                    dispatch(loadFriendFailureAction())
                }
            } else {
                dispatch(loadFriendFailureAction())
            }

        } catch (error) {
            console.log(LOAD_FRIEND_FAILURE_ACTION, error);
            dispatch(loadFriendFailureAction());
        }
    }
}

export function AddFriendThunk(values) {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('token');
             await axios({
                url: process.env.REACT_APP_API_SERVER + '/api/friends',
                method: 'post',
                headers: { Authorization: `Bearer ${token}` },
                data: values
            })
            //console.log('add Friend req', addFriendReq);
            let getNotificationReq = await axios({
                url: process.env.REACT_APP_API_SERVER + '/api/user/notifications/' + values.recipient,
                headers: { Authorization: `Bearer ${token}` }
            })
           // console.log('load notification', getNotificationReq)
            dispatch(loadNotificationSuccessAction(getNotificationReq.data));
        } catch (error) {
            console.log('add friend error', error)
            dispatch(addFriendFailureAction());
        }
    }
}

export function deleteFriendThunk(values) {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem('token');
            let deleteFriendReq = await axios({
                url: process.env.REACT_APP_API_SERVER + '/api/friends',
                method: 'delete',
                headers: { Authorization: `Bearer ${token}` },
                data: values
            })
            //console.log('delete Friend req', deleteFriendReq);
            dispatch(deleteFriendSuccessAction(deleteFriendReq.data))
        } catch (error) {
            console.log('delete friend error', error)
            dispatch(deleteFriendFailureAction());
        }
    }
}