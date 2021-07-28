import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/reducer";
import friendListReducer from "./friendsList/reducer";
import notiListReducer from "./notification/reducer";
import postListReducer from "./post/reducer";
import socketReducer from "./socket/reducer";
import userInfoReducer from "./userInfo/reducer";
import allUsersListReducer from "./allUsersInfo/reducer"
import scheduleListReducer from "./schedule/reducer";
import realTimeNotiReducer from "./real_time_noti/reducer";


export const store = createStore(
    combineReducers({
        authStore: authReducer,
        userInfoStore: userInfoReducer,
        friendListStore: friendListReducer,
        socketStore: socketReducer,
        notiListStore: notiListReducer,
        postListStore: postListReducer,
        allUsersListStore: allUsersListReducer,
        scheduleListStore:scheduleListReducer,
        realTimeNotiStore:realTimeNotiReducer,
    }),
    applyMiddleware(thunk)
)