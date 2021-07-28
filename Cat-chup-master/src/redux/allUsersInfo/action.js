import axios from "axios";

export const LOAD_ALLUSERS_SUCCESS_ACTION = "LOAD_ALLUSERS_SUCCESS_ACTION";
export const LOAD_ALLUSERS_FAILURE_ACTION = "LOAD_ALLUSERS_FAILURE_ACTION";

export function loadAllUsersSuccessAction(allUsersInfo) {
    return {
        type: LOAD_ALLUSERS_SUCCESS_ACTION,
        allUsersInfo: allUsersInfo
    }
}
export function loadAllUsersFailureAction() {
    return {
        type: LOAD_ALLUSERS_FAILURE_ACTION
    }
}

export function loadAllUsersThunk() {
    return async (dispatch) => {
        let jwt = localStorage.getItem('token');
        try {
            let usersReq = await axios({
                url: process.env.REACT_APP_API_SERVER + '/api/users',
                headers: { Authorization: `Bearer ${jwt}` },
            })
            let usersList = usersReq.data
            dispatch(loadAllUsersSuccessAction(usersList));
        } catch (error) {
            console.log('load all users thunk error', error);
            dispatch(loadAllUsersFailureAction());
        }

    }
}