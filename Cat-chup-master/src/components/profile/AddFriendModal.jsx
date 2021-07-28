import {store} from 'react-notifications-component';
import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal,ModalHeader,ModalBody,ModalFooter,Button } from "reactstrap";
import { Checkbox,FormControlLabel,FormGroup, TextareaAutosize} from '@material-ui/core';

export const AddFriendModal = (props)=>{

    const {modalIsOpen,toggle,className,ownerName} = props;
    const socketStore = useSelector(state=>state.socketStore);
    const socket = socketStore.webSocket;
    const userStore = useSelector(state=>state.userInfoStore);
    let userInfo = userStore.userInfo;
    const formik = useFormik({
        initialValues:{
            intro:'Hey, I am '+userInfo.username,
            donor:userInfo.username,
            recipient:ownerName,
            type:'friend_request',
            checked:[],
        },
        onSubmit: async values =>{
            let token = localStorage.getItem('token');
            //alert(JSON.stringify(values,null,2));
            try {
                let sendReq = await axios({
                    url:process.env.REACT_APP_API_SERVER+'/api/user/friendRequest/',
                    headers:{Authorization:`Bearer ${token}`},
                    data:values,
                    method:'post'
                });
                //console.log('sendReq',sendReq);
                if(sendReq.status===200){
                    socket.emit('friend_request',{donor:values.donor,recipient:values.recipient})
                    store.addNotification({
                        title:'Friend request sent!',
                        message:'Please wait for other people to confirmed your request',
                        type:'success',
                        insert:'top',
                        container:'top-right',
                        // animationIn:['animate__animated','animate__fadeIn'],
                        // animationOut:['animate__animated','animate_fadeOut'],
                        dismiss:{
                            duration:2000,
                            onScreen:true
                        }
                    })
                }else{
                    store.addNotification({
                        title:'Internal error',
                        message:'Please try again later',
                        type:'warning',
                        insert:'top',
                        container:'top-right',
                        // animationIn:['animate__animated','animate__fadeIn'],
                        // animationOut:['animate__animated','animate_fadeOut'],
                        dismiss:{
                            duration:2000,
                            onScreen:true
                        }
                    })
                }
                
            } catch (error) {
                console.log('error sending friendRequest',error)
                store.addNotification({
                    title:'Internal error',
                    message:'Please try again later',
                    type:'warning',
                    insert:'top',
                    container:'top-right',
                    // animationIn:['animate__animated','animate__fadeIn'],
                    // animationOut:['animate__animated','animate_fadeOut'],
                    dismiss:{
                        duration:2000,
                        onScreen:true
                    }
                })
            }
            
        }
    })
    useEffect(()=>{
        formik.resetForm({
            values:{
                intro:`Hey, I am ${userInfo.username}`,
                donor:userInfo.username,
                recipient:ownerName,
                type:'friend_request',
                checked:[],
            }
        })
    },[userInfo,ownerName])
    

    return (
        <div>
            <Modal isOpen={modalIsOpen} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Send Friend Request</ModalHeader>
                <ModalBody>
                  <form onSubmit={formik.handleSubmit} id='add-friend-form'>
                      <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox name='checked' onChange={formik.handleChange} value="Close Friends"/>}
                            label='Close friends'
                        />
                        <FormControlLabel
                            control={<Checkbox name='checked' onChange={formik.handleChange} value="Family"/>}
                            label='Family'
                        />
                        <FormControlLabel
                            control={<Checkbox name='checked' onChange={formik.handleChange} value="Work"/>}
                            label='Work'
                        />
                        <FormControlLabel
                            control={<Checkbox name='checked' onChange={formik.handleChange} value="School"/>}
                            label='School'
                        />
                        <FormControlLabel
                            control={<TextareaAutosize style={{resize:'none'}} name="intro" id="intro" cols="30" minRows="3" maxLength="50"
                            value={formik.values.intro} onChange={formik.handleChange}></TextareaAutosize>}
                            label='desription'
                            labelPlacement='top'
                        />
                        
                      </FormGroup>
                    
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button type='submit' form='add-friend-form' color="primary" onClick={toggle}>Send</Button>{' '}
                  <Button color="secondary" type='button' onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}