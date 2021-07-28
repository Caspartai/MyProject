
import { useFormik } from "formik";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { registerThunk } from "../redux/auth/action";
import * as yup from 'yup'
import axios from 'axios'
import '../stylesheet/Register.css'
import { FormControl, InputLabel,Input, FormHelperText, TextField, Button } from "@material-ui/core";
import { useEffect } from "react";




const Register = (props) =>{
    const [imgUrl,setImgUrl] = useState(null);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{
            username:'',
            email:'',
            password:'',
            confirmPassword:'',
            file:null,
            phone:'',
            city:'',
            description:''
        },
        onSubmit:values=>{
            //alert(JSON.stringify(values,null,2));
            dispatch(registerThunk(values));
        },
        validationSchema:yup.object().shape({
            file:yup.mixed().required('please upload a picture').test('checkFileType','please choose a image file' ,function(value){
                
                if(value){
                    //console.log('type',value.type)
                    const supported_type=['image/jpeg','image/png','image/jpg']
                 let matched = supported_type.find(type=>type===value.type)
                 //console.log('matched',matched);
                 if(matched){
                     return true;
                 }else{
                     return false
                 }
                }
                
            }),
            username:yup.string().max(15,'Must be 15 cahracters or less').required('Required').test('checkNameExist','name already taken',function(value){
                return new Promise((resolve,reject)=>{
                    axios.post(process.env.REACT_APP_API_SERVER+'/api/checkUsername',{
                        username:value
                    }).then((data)=>{
                    if(data.data){
                        resolve(true);
                    }else {
                        resolve(false)
                    }
               
                    }).catch((err)=>{
                        console.log('check username error',err);
                        reject(err);
                    })
                })
            }),
            password:yup.string().required('Required'),
            email:yup.string().email().required('Required'),
            confirmPassword:yup.string().oneOf([yup.ref('password'),null],'Passwords must match').required('Required')
        }),
        validateOnChange:false
    })
    
    

    
    
    const fileOnChange = (e)=>{
        formik.setFieldValue('file',e.currentTarget.files[0])
        
    }
    const pictureAvatar = ()=>{
        if(formik.values.file){
            let reader = new FileReader();
            reader.onloadend = ()=>{
                console.log('image reader',reader.result);
                setImgUrl(reader.result);
            }
            reader.readAsDataURL(formik.values.file)
            return (
                <div className='selected-avatar' style={{backgroundImage:`url(${imgUrl})`}}></div>
            )
        }else{
            return (
                <div className='default-avatar' ></div>
            )
        }
        
    }
    useEffect(()=>{
        console.log('all the error',formik.errors)
    },[formik.errors])
    
    return (
        <div className='row mx-0 full-size'>
            <div className='col-6 px-0 cover-container'>

            </div>
            <div className='col-6 px-0'>
                <center className='profile-container'>
                    {pictureAvatar()}
                    <form onSubmit={formik.handleSubmit}>
                    <input type="file" 
                    onChange={fileOnChange}
                     files={formik.values.file}
                     onBlur={formik.handleBlur}
                        id='file' name='file'
                        className={formik.errors.file && formik.touched.file && 'error-input'}
                    />
                    {formik.errors.file && formik.touched.file && <div className='error-message'>{formik.errors.file}</div>}
                    <div className='row mx-0 input-form mt-4'>
                        <div className='col-6 left-input'>
                            <FormControl error={formik.errors.username && formik.touched.username?true:false}>
                                <InputLabel htmlFor='username'>Username*</InputLabel>
                                <Input 
                                name='username' id='username'
                                value={formik.values.username}
                                type="text" 
                                onChange = {formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.errors.username && formik.touched.username && 'error-input'}
                                />
                                <FormHelperText>{formik.errors.username && formik.touched.username && formik.errors.username}</FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl error={formik.errors.email && formik.touched.email?true:false}>
                                <InputLabel htmlFor='email'>Email*</InputLabel>
                                <Input 
                                name='email' id='email'
                                value={formik.values.email}
                                type="email" 
                                onChange = {formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                                <FormHelperText>{formik.errors.email && formik.touched.email && formik.errors.email}</FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl error={formik.errors.password && formik.touched.password?true:false}>
                            <InputLabel htmlFor='password'>Password*</InputLabel>
                                <Input 
                                name='password' id='password'
                                value={formik.values.password}
                                type="password" 
                                onChange = {formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                                <FormHelperText>{formik.errors.password && formik.touched.password &&formik.errors.password}</FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl error={formik.errors.confirmPassword && formik.touched.confirmPassword?true:false}>
                            <InputLabel htmlFor='confirmPassword'>Confrim Password*</InputLabel>
                                <Input 
                                name='confirmPassword' id='confirmPassword'
                                value={formik.values.confirmPassword}
                                type="password" 
                                onChange = {formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                                <FormHelperText>{formik.errors.confirmPassword && formik.touched.confirmPassword && formik.errors.confirmPassword}</FormHelperText>
                            </FormControl>

                        </div>
                        <div className='col-6 right-input'>
                            <FormControl>
                            <InputLabel htmlFor='phone'>phone (optional)</InputLabel>
                                <Input type="text" 
                                    name='phone' id='phone'
                                    value={formik.values.phone}
                                    onChange = {formik.handleChange}
                                    placeholder='phone (optional)'
                                />
                            </FormControl>
                            <br />
                            <FormControl>
                            <InputLabel htmlFor='city'>city (optional)</InputLabel>
                                <Input type="text" 
                                    name='city' id='city'
                                    value={formik.values.city}
                                    onChange = {formik.handleChange}
                                    placeholder='city (optional)'
                                />
                            </FormControl>
                            <br />
                            <TextField style={{marginTop:'30px'}}
                                id='description'
                                name='description'
                                label='description (optional)'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                multiline
                                rows={3}
                            
                            />
                            
                        </div>
                    </div>
                    <Button
                        type='submit'
                        className=' mt-3'
                    >Register</Button>
                    </form>
                    <div className='mt-4' style={{color:'#c4c4c4'}}>
                        <Button href='/login'>Already have an account?</Button>
                    </div>
                    
                </center>
            
            
            
            
            </div>
            
        </div>
    )
}
export default Register