import { ADD_NEW_POST_FAILURE_ACTION, ADD_NEW_POST_SUCCESS_ACTION, LOAD_POST_FAILURE_ACTION, LOAD_POST_SUCCESS_ACTION, UPDATE_POST_ACTION } from "./action"


const initialState = {
    postList:[]
}

const postListReducer = (state=initialState,action)=>{
    switch(action.type){
        case ADD_NEW_POST_SUCCESS_ACTION:
            return {
                postList:[action.newPost,...state.postList]
            }
        case LOAD_POST_SUCCESS_ACTION:
            return {
                postList:action.postList
            }
        case UPDATE_POST_ACTION:
            let newPostList = state.postList.filter((post)=>(post.id!==action.updatedPost.id));
            newPostList.push(action.updatedPost);
            newPostList.sort((a,b)=>{
                if(a.created_at<b.created_at){
                    return 1;
                }else{
                    return -1;
                }
            })
            return {
                postList:newPostList
            }
        case LOAD_POST_FAILURE_ACTION:
        case ADD_NEW_POST_FAILURE_ACTION:
        default:
            return state
    }
}

export default postListReducer;