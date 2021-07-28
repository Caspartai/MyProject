import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faAt, faJedi, faEdit, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'
import { ProfileEditModal } from "./ProfileEditModal"
import { AddFriendModal } from "./AddFriendModal"
import { ProfilePicDiv } from "./ProfilePicDiv"
import cat_chup from '../../img/logo87.svg'
import {Button} from 'reactstrap'
import { useSelector } from "react-redux"
import { getOrCreateChat } from "react-chat-engine"
import { useHistory } from "react-router-dom"



let profileBtn = {
    position: 'absolute',
    right: '40px',
    bottom: "10px"
}


export const PersonalProfile = (props) => {
    //console.log('isOwner', props.isOwner);
    //console.log('userInfo', props.userInfo);
    const history=useHistory();
    const userInfoStore = useSelector(state=>state.userInfoStore);
    const userInfo = userInfoStore.userInfo;
    const [modalIsOpen, setOpenModal] = useState(false);
    const toggle = () => setOpenModal(!modalIsOpen);
    const showButton = () => {
        switch (true) {
            case props.isOwner:
                return <button className='btn btn-primary' style={profileBtn} onClick={toggle}><FontAwesomeIcon icon={faEdit} /> edit Profile</button>;

            case props.areFriends:
                return <Button outline onClick={directMessage} color='success' style={{...profileBtn}}><span style={{display:'inline'}}><img style={{width:'20px'}} src={cat_chup} alt="" /></span> cat-chup</Button>;
            default:
                return <button className='btn btn-success' onClick={toggle} style={profileBtn}><FontAwesomeIcon icon={faUserPlus} />add friend</button>
        }
    }
    const directMessage = async ()=>{
        const creds = {
            projectID:process.env.REACT_APP_CHAT_PROJECTID,
            userName:userInfo.username,
            userSecret:userInfo.hash
        }
         getOrCreateChat(creds,{is_direct_chat:true,usernames:[props.userInfo.username]},(data)=>{
            //console.log('create chat in profile page',data);
            history.push('/messages');
        })
        
    }
//here write if user exists if not return  logo in a div
    return (
        
        <div style={{position:'sticky', height:'33vh',borderBottom:'1px solid #c4c4c4',top:'0',zIndex:'10',backgroundColor:'white'}}>
            <div className='' style={{width:'100%',height:'200px',backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundImage:`url(${process.env.REACT_APP_API_SERVER+props.userInfo.bgImgPath})`}}>
            </div>
            <div style={{ position: 'absolute', top: '100px', left: "100px" }}>
                <ProfilePicDiv
                    imgPath={process.env.REACT_APP_API_SERVER + props.userInfo.imgPath}
                />
                <center style={{ lineHeight: "0" }}>
                    <p className=' mb-0'><FontAwesomeIcon icon={faAt} /> {props.userInfo.username}</p>
                    {props.userInfo.city ? <p className='mt-1'><FontAwesomeIcon icon={faMapMarkerAlt} /> lives in {props.userInfo.city}</p> : null}
                </center>
            </div>
            <div className='row mt-3'>
                <div className='col-6'>
                </div>
                {props.userInfo.description ? <div className='col-6'><FontAwesomeIcon icon={faJedi} /> bio: {props.userInfo.description}</div> : null}
            </div>
            <div>
                {showButton()}
            </div>
            {props.isOwner ? <ProfileEditModal
                toggle={toggle}
                modalIsOpen={modalIsOpen}
            /> : null}
            {(!props.isOwner && !props.areFriends) ? <AddFriendModal
                toggle={toggle}
                modalIsOpen={modalIsOpen}
                ownerName={props.userInfo.username}
            /> : null}
        </div>













    )
}