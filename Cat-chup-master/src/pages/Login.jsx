import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginThunk } from "../redux/auth/action";
import * as yup from 'yup';
import { Button, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";



export const Login = (props)=>{
    
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            username:'',
            password:''
        },
        onSubmit:values=>{
            // alert(JSON.stringify(values,null,2));
            dispatch(loginThunk(values))
        },
        validationSchema:yup.object().shape({
            username:yup.string().required('Required'),
            password:yup.string().required('Required'),
        }),
        validateOnChange:false,
    })

    
    

    return (
        <div className='row mx-0 full-size'>
            <div className='col-6 px-0 cover-container'>
                
            </div>
            <div className='col-6 px-0'>

                <center >
                    <div className='logo-container ' style={{marginTop:'130px'}}>

                    </div>
                    <div className='profile-container' style={{marginTop:'30px'}}>
                        <form onSubmit={formik.handleSubmit}>
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
                            {/* <input 
                                name='username' id='username'
                                type="text" 
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='username'
                                className={formik.errors.username && formik.touched.username && 'error-input'}
                            />
                            {formik.errors.username && formik.touched.username && <div className='error-message'>{formik.errors.username}</div>} */}
                            <br/>
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
                            <br/>
                            {/* <input 
                                name='password' id='password'
                                type="password" 
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='password'
                                className={formik.errors.password && formik.touched.password && 'error-input'}
                            />
                            {formik.errors.password && formik.touched.password && <div className='error-message'>{formik.errors.password}</div>} */}
                            <Button  type='submit' className='mt-3'>Login</Button>
                        </form>
                    </div>
                    <div className='mt-4' style={{color:'#c4c4c4'}}>
                        <Button href='/register'>does not have an account yet?</Button>
                    </div>
                    
                </center>
            </div>
            
        </div>
    )
}