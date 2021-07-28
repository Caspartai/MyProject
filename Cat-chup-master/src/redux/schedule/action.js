import axios from "axios";



export const LOAD_SCHEDULE_SUCCESS_ACTION = 'LOAD_SCHEDULE_SUCCESS_ACTION';
export const LOAD_SCHEDULE_FAILURE_ACTION = 'LOAD_SCHEDUEL_FAILURE_ACTION';
export const ADD_NEW_SCHEDULE_SUCCESS_ACTION = 'ADD_NEW_SCHEDULE_SUCCESS_ACTION';
export const ADD_NEW_SCHEDULE_FAILURE_ACTION = 'ADD_NEW_SCHEDULE_FAILURE_ACTION';

export function loadScheduleSuccessAction(scheduleList){
    return {
        type:LOAD_SCHEDULE_SUCCESS_ACTION,
        scheduleList:scheduleList
    }
}

export function loadScheduleFailureAction(){
    return {
        type:LOAD_SCHEDULE_FAILURE_ACTION
    }
}

export function addNewScheduleSuccessAction(newSchedule){
    return {
        type:ADD_NEW_SCHEDULE_SUCCESS_ACTION,
        newSchedule:newSchedule
    }
}

export function addNewScheduleFailureAction(){
    return {
        type:ADD_NEW_SCHEDULE_FAILURE_ACTION
    }
}

export function loadScheduleThunk(username){
    return async (dispatch)=>{
        try {
            let token = localStorage.getItem('token');
            let getScheduleReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/schedule/'+username,
                headers: { Authorization: `Bearer ${token}` },
            })
            //console.log('load schedule req',getScheduleReq);
            dispatch(loadScheduleSuccessAction(getScheduleReq.data));
        } catch (error) {
            console.log('load schedule thunk error',error)
            dispatch(loadScheduleFailureAction())
        }
    }
}


// export function addNewScheduleThunk(values){
//     return async (dispatch)=>{
//         const options = {
//             maxSizeMB: 1,
//             maxWidthOrHeight: 500,
//             useWebWorker: true
//         }
//         let token = localStorage.getItem('token');
//         try {
//             console.log('add new schedule thunk',values);
//             let compressImagePromise = [];
//             for(let i=0;i<values.attachPic.length;i++){
//                 compressImagePromise.push(imageCompression(values.attachPic[i].file,options));

//             }
//             let compressRes = await Promise.all(compressImagePromise);
//             console.log('compress res',compressRes);
//             let savePicPromises=[];
//             for(let i=0;i<compressRes.length;i++){
//                 let formData = new FormData();
//                 formData.append('post_pic',compressRes[i]);
//                 formData.append('pic_name',compressRes[i].name);
//                 let uploadImg = axios({
//                     url: process.env.REACT_APP_API_SERVER + '/api/upload-post-pic',
//                     method: 'post',
//                     data: formData,
//                     headers: { 'Content-Type': 'multipart/form-data' },
//                 });
//                 savePicPromises.push(uploadImg);
//             }
//             let savePicRes = await Promise.all(savePicPromises);
//             console.log('save picture res', savePicRes);
//             let newPost = {};
//             if(values.type ==='post'){
//                 newPost.owner_name = values.ownerName;
//                 let content = {caption:values.caption,attachPic:[]};
//                 savePicRes.map((imgReq,index)=>{
//                     content.attachPic.push(imgReq.data);
//                 })
//                 newPost.content=content;
//                 newPost.visible_group = values.visible_group;
//                 newPost.type=values.type;
//                 console.log('post pre-upload',newPost);
//             }else if(values.type==='event'){
//                 newPost.owner_name = values.ownerName;
//                 newPost.visible_group = values.visible_group;
//                 newPost.type=values.type;
//                 let content = {
//                     start:values.start,
//                     end:values.end,
//                     title:values.title,
//                     caption:values.caption,
//                     attachPic:[],
//                 }
//                 savePicRes.map((imgReq,index)=>{
//                     content.attachPic.push(imgReq.data);
//                 })
//                 newPost.content = content;
//                 console.log('event pre-upload',newPost)
//             }
            
//             let addNewPost = await axios({
//                 url:process.env.REACT_APP_API_SERVER+'/api/post',
//                 method:'post',
//                 data:newPost,
//                 headers:{Authorization:`Bearer ${token}`},
//             })
//             console.log('add new post result',addNewPost);
//             console.log('new post',newPost);
//             if(addNewPost.status===200){

//                 dispatch(addNewPostSuccessAction(addNewPost.data))
//                 store.addNotification({
//                     title:'add post success!',
//                     message:'Congratulations!',
//                     type:'success',
//                     insert:'top',
//                     container:'top-right',
//                     // animationIn:['animate__animated','animate__fadeIn'],
//                     // animationOut:['animate__animated','animate_fadeOut'],
//                     dismiss:{
//                         duration:2000,
//                         onScreen:true
//                     }
//                 })
//             }else{
//                 dispatch(addNewPostFailureAction());
//                 store.addNotification({
//                     title:'Internal error',
//                     message:'Please try again later',
//                     type:'warning',
//                     insert:'top',
//                     container:'top-right',
//                     // animationIn:['animate__animated','animate__fadeIn'],
//                     // animationOut:['animate__animated','animate_fadeOut'],
//                     dismiss:{
//                         duration:2000,
//                         onScreen:true
//                     }
//                 })
//             }

//         } catch (error) {
//             console.log('add new post thunk error',error);
//             dispatch(addNewPostFailureAction());
//         }
//     }
// }

