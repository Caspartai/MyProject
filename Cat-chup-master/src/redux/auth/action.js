import axios from "axios";
import imageCompression from "browser-image-compression";


export const AUTH_SUCCESS_ACTION = "LOGIN_SUCCESS_ACTION";
export const AUTH_FAILURE_ACTION = "LOGIN_FAILURE_ACTION";
export const LOGOUT_ACTION = "LOGOUT_ACTION";

export function authSuccessAction() {
    return {
        type: AUTH_SUCCESS_ACTION
    }
}
export function authFailureAction() {
    return {
        type: AUTH_FAILURE_ACTION
    }
}
//TODO:handle login error
export function loginThunk(values){
    return (dispatch)=>{
        return axios.post(process.env.REACT_APP_API_SERVER+'/api/login',{
            username:values.username,password:values.password
        }).then((response)=>{ 
            //console.log('request',response)
            if(response.data==null){
                alert('username or password incorrect!')
                dispatch(authFailureAction());

            } else if (!response.data.token) {
                alert('username or password incorrect!')
                dispatch(authFailureAction());

            } else {
                localStorage.setItem('token', response.data.token);
                dispatch(authSuccessAction());
            }
        }).catch((err) => {
            console.log('login error', err);
            alert('username or password incorrect!');
            dispatch(authFailureAction());
        })
    }
}

export function registerThunk(values){
    return async (dispatch)=>{
        //console.log('inside thunk',values);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        }
        try {
            const compressedImg = await imageCompression(values.file, options)
            //console.log('compressed Image',compressedImg);
            let formData = new FormData();
            formData.append('profile_pic', compressedImg);
            formData.append('pic_name', compressedImg.name)

            const uploadImg = await axios({
                url: process.env.REACT_APP_API_SERVER + '/api/upload-profile-pic',
                method: 'post',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            //console.log('uploadImg respond',uploadImg);
            let imgPath = uploadImg.data;
            let newUser = {};
            Object.assign(newUser, values);
            delete newUser.file;
            delete newUser.confirmPassword
            newUser.imgPath = imgPath;
            let registerUser = await axios({
                url: process.env.REACT_APP_API_SERVER + '/api/register',
                method: 'post',
                data: newUser
            })
            if (registerUser.data == null) {
                dispatch(authFailureAction());
            } else if (!registerUser.data.token) {
                dispatch(authFailureAction());
            } else {
                localStorage.setItem('token', registerUser.data.token);
                dispatch(authSuccessAction());
            }
            //console.log('registerUser',registerUser);
        } catch (error) {
            console.log('compress error', error)
        }

    }
}

// logout
export const logoutThunk = () => (dispatch) => {
    localStorage.clear("token");
    dispatch({ type: LOGOUT_ACTION })

}