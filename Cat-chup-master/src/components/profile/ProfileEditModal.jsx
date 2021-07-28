import { useState,useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt,faJedi, faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons"
import { BgPicDiv } from "./BgPicDiv";
import { ProfilePicDiv } from "./ProfilePicDiv";
import { UploadImage } from "./UploadImage";
import { useFormik } from "formik";
import { updateProfileThunk } from "../../redux/userInfo/action";
import { useDispatch, useSelector } from "react-redux";



export const ProfileEditModal = (props)=>{
    const {
        className,toggle,modalIsOpen
    } = props;
    const userStore = useSelector(state=>state.userInfoStore);
    let userInfo = userStore.userInfo;
    const dispatch = useDispatch()
    const formik=useFormik({
      initialValues:{
        profilePic:[],
        bgPic:[],
        email:userInfo.email,
        phone:userInfo.phone,
        city:userInfo.city,
        description:userInfo.description
      },
      onSubmit:async values=>{
        toggle();
        // if(values.profilePic[0]){
        //   values.profilePic=values.profilePic[0].file.name
        // }
        // if(values.bgPic[0]){
        //   values.bgPic=values.bgPic[0].file.name
        // }
        
        setEditingProfile(false);
        formik.resetForm();
        //console.log('formik vlaues after reset', formik.values)
        //alert(JSON.stringify(values,null,2));
        if(formik.values.profilePic[0]||formik.values.bgPic[0]||editingProfile){
          //await updateProfile(values,userInfo.imgPath,userInfo.bgImgPath,userInfo.username);
          dispatch(updateProfileThunk(values,userInfo.imgPath,userInfo.bgImgPath,userInfo.username))
          //setChanged(!infoChanged);
        }
        
      },
      
    })
    const [editingProfile,setEditingProfile] = useState(false);
    const setProfilePic = (imageList)=>{
      formik.setFieldValue('profilePic',imageList);
    }
    const setBgPic = (imageList)=>{
      formik.setFieldValue('bgPic',imageList);
    }
    const toggleProfileEdit = ()=>{
      setEditingProfile(true);
    }
    const discardProfileChanges = ()=>{
      let profilePic=formik.values.profilePic;
      let bgPic = formik.values.bgPic;
      formik.resetForm();
      formik.setFieldValue('profilePic',profilePic);
      formik.setFieldValue('bgPic',bgPic);
      setEditingProfile(false);

    }
    const cancelEdit= ()=>{
      if(formik.values.profilePic[0]||formik.values.bgPic[0]||editingProfile){
        let cancel = window.confirm('this will discard all the changes,are u sure?');
        if(cancel){
          formik.resetForm();
          setEditingProfile(false);
          toggle();
        }else{
          return null;
        }
      }else{
        toggle();
      }
      // toggle();
      
    }
    useEffect(()=>{
      //console.log('use effect',userInfo.email)
      //console.log('images',formik.values);
      formik.resetForm({
        values:{
          profilePic:[],
          bgPic:[],
          email:userInfo.email,
          phone:userInfo.phone,
          city:userInfo.city,
          description:userInfo.description
        }
      })
  },[userInfo])
    return (
        <div>
            
            <Modal isOpen={modalIsOpen} toggle={toggle} className={className}>
              <ModalHeader  style={{borderBottom:'1px solid black !import'}}>Edit Profile</ModalHeader>
               
              <ModalBody>
                <form onSubmit={formik.handleSubmit} id='update-profile-form'>
                    <UploadImage
                      initialPic={userInfo.imgPath}
                      title='Profile picture'
                      PicDiv={ProfilePicDiv}
                      newPic={[formik.values.profilePic,setProfilePic]}

                    />
                    <UploadImage
                      initialPic={userInfo.bgImgPath}
                      title='Cover photo'
                      PicDiv={BgPicDiv}
                      newPic={[formik.values.bgPic,setBgPic]}
                    />
                    <div style={{position:'relative'}}>
                      <p>Customize your profile</p>
                      {!editingProfile?(<div style={{paddingLeft:'10px',lineHeight:'1'}}>
                      <button type='button' className='btn btn-primary' style={{position:'absolute',right:'0px',top:'0px'}} onClick={toggleProfileEdit}>Edit</button>
                      <p><FontAwesomeIcon icon={faEnvelope}/> email: {userInfo.email}</p>
                      <p><FontAwesomeIcon icon={faPhone}/> phone: {userInfo.phone}</p>
                      <p><FontAwesomeIcon icon={faMapMarkerAlt}/> lives in {userInfo.city}</p>
                      <p><FontAwesomeIcon icon={faJedi}/> bio: {userInfo.description}</p>
                      </div>):(<div style={{paddingLeft:'10px'}}>
                        <button type='button' className='btn btn-danger' style={{position:'absolute',right:'0px',top:'0px'}} onClick={discardProfileChanges}>Discard</button>
                        <div><FontAwesomeIcon icon={faEnvelope}/> <input style={{marginLeft:'2px'}} type="email" name='email' id='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder='email'
                        /></div>
                        <div><FontAwesomeIcon icon={faPhone}/> <input style={{marginLeft:'2px'}} type="text" name='phone' id='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            placeholder='phone'
                        /></div>
                        <div><FontAwesomeIcon icon={faMapMarkerAlt}/> <input style={{marginLeft:'6px'}} type="text" name='city' id='city'
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            placeholder='city'
                        /></div>
                        <div ><FontAwesomeIcon style={{verticalAlign:'top',marginTop:'5px',resize:'none'}} icon={faJedi}/> <textarea cols='23' type="text" name='description' id='description'

                            value={formik.values.description}
                            onChange={formik.handleChange}
                            placeholder='description'
                        /></div>
                      </div>)}
                    </div>
                </form>
                
                
                
              </ModalBody>
              
              <ModalFooter>
                <Button color="primary" type='submit' form='update-profile-form'>Save</Button>{' '}
                <Button color="secondary" onClick={cancelEdit}>Cancel</Button>
              </ModalFooter>
            </Modal>
    </div>
    )
}


