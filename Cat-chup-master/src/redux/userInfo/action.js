import axios from "axios";
import imageCompression from "browser-image-compression";


export const LOAD_PROFILE_SUCCESS_ACTION = "LOAD_PROFILE_SUCCESS_ACTION";
export const LOAD_PROFILE_FAILURE_ACTION = "LOAD_PROFILE_FAILURE_ACTION";
export const UPDATE_PROFILE_SUCCESS_ACTION = "UPDATE_PROFILE_SUCCESS_ACTION";
export const UPDATE_PROFILE_FAILURE_ACTION = "UPDATE_PROFILE_FAILURE_ACTION";

export function loadProfileSuccessAction(userInfo) {
    return {
        type: LOAD_PROFILE_SUCCESS_ACTION,
        userInfo: userInfo
    }
}
export function loadProfileFailureAction() {
    return {
        type: LOAD_PROFILE_FAILURE_ACTION
    }
}
export function updateProfileSuccessAction(userInfo) {
    return {
        type: UPDATE_PROFILE_SUCCESS_ACTION,
        userInfo: userInfo
    }
}
export function updateProfileFailureAction() {
    return {
        type: UPDATE_PROFILE_FAILURE_ACTION
    }
}

export function loadProfileThunk(pageOwnerName) {
    return async (dispatch) => {
        let jwt = localStorage.getItem('token');
        try {
            let profileReq = await axios({
                url: process.env.REACT_APP_API_SERVER + '/api/user/profile/' + pageOwnerName,
                headers: { Authorization: `Bearer ${jwt}` },
            })
            //console.log('in thunk get data',profileReq.data);
            let userProfile = profileReq.data
            dispatch(loadProfileSuccessAction(userProfile));
        } catch (error) {
            console.log('load profile thunk error', error);
            dispatch(loadProfileFailureAction());
        }

    }
}

export function updateProfileThunk(values, initialProPath, initialbgPath, username) {
    return async (dispatch) => {
        console.log('submit', values, initialProPath, initialbgPath)
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        }
        let newProfile = {
            email: values.email,
            phone: values.phone,
            city: values.city,
            description: values.description
        }
        let token = localStorage.getItem('token');
        try {
            if (values.bgPic[0]) {
                console.log('try to upload bg', values.bgPic[0])
                let compressedImg = await imageCompression(values.bgPic[0].file, options)
                let bgFormData = new FormData();
                bgFormData.append('profile_pic', compressedImg);
                bgFormData.append('pic_name', compressedImg.name)

                let uploadBgImg = await axios({
                    url: process.env.REACT_APP_API_SERVER + '/api/upload-bg-pic',
                    method: 'post',
                    data: bgFormData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                //console.log('uploadImg respond',uploadImg);
                let bgImgPath = uploadBgImg.data;
                newProfile.bgImgPath = bgImgPath;
            } else {
                newProfile.bgImgPath = initialbgPath
            }
            if (values.profilePic[0]) {
                console.log('try to upload profile', values.profilePic[0])
                let compressedImg = await imageCompression(values.profilePic[0].file, options)
                let proFormData = new FormData();
                proFormData.append('profile_pic', compressedImg);
                proFormData.append('pic_name', compressedImg.name)

                let uploadImg = await axios({
                    url: process.env.REACT_APP_API_SERVER + '/api/upload-profile-pic',
                    method: 'post',
                    data: proFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data',

                    },
                })
                //console.log('uploadImg respond',uploadImg);
                let imgPath = uploadImg.data;
                newProfile.imgPath = imgPath;
            } else {
                newProfile.imgPath = initialProPath
            }
            newProfile.username = username;
            let uploadReq = await axios({
                url: process.env.REACT_APP_API_SERVER + `/api/user/profile/${username}`,
                method: 'put',
                data: newProfile,
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            if (uploadReq) {
                dispatch(updateProfileSuccessAction(newProfile));
            }
        } catch (error) {
            console.log('update profile error', error)
            dispatch(updateProfileFailureAction());
        }
    }
}