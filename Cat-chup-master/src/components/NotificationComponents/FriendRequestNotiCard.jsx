import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import userAvatar from '../../img/profileIcon.png';
import { AddFriendThunk } from "../../redux/friendsList/action";
import { updateNotificationAction } from "../../redux/notification/action";



export const FriendRequestNotiCard = (props) =>{
    const {noti} = props
    const {donor,content,solved} = noti;
    const [localSolved,setLocalSolved] = useState(null);
    const [userInfo,setUserInfo] = useState(null);
    const [dateTime,setDateTime] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    //console.log('content',content);
    useEffect(()=>{
        let jwt = localStorage.getItem('token');
        async function getDonorInfo (){
            let getDonorReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/user/profile/'+donor,
                headers:{Authorization:`Bearer ${jwt}`}
            })
            //console.log('getDonorInfo',getDonorReq);
            setUserInfo(getDonorReq.data);
            setLocalSolved(solved);
            
        }
        getDonorInfo();
        let time = new Date(noti.created_at)
        setDateTime(time.toLocaleDateString()+' '+time.toLocaleTimeString());
        //console.log('set up time', noti)
       
    },[noti,donor,solved]);
    const acceptFriend = ()=>{
        dispatch(AddFriendThunk(noti));
        // dispatch(loadNotiThunk(noti.recipient))
    }
    const handleIgnore = async ()=>{
        let token = localStorage.getItem('token');
        try {
            let ignoreReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/noti/ignore/'+noti.id,
                headers:{Authorization:`Bearer ${token}`}
            })
            console.log('ignoreReq',ignoreReq);
            if(ignoreReq.status===200){
                let newNoti = {
                    ...noti
                }
                newNoti.solved = true;
                dispatch(updateNotificationAction(newNoti));
                setLocalSolved(true);
            }
        } catch (error) {
            console.log('ignore friend req',error)
        }
        
    }
    const handleRedProfile = (e)=>{
        e.stopPropagation();
        history.push('/'+noti.donor)
        //window.location.href = '/'+noti.donor
    }
    return (
        <div style={{backgroundColor:'#E3E3E3',paddingBottom:'5px',border:'1px solid #303030'}} className='row mx-0'>
            <div className='col-1 px-0 pt-2'>
                <FontAwesomeIcon icon={faUserPlus}/>
            </div>
            <div className='col-2 px-0'>
                <div onClick={handleRedProfile} className='profileImgContainer' style={{cursor:'pointer',width:'50px',height:'50px',borderRadius:'50%',backgroundPosition:'center',backgroundRepeat:'no-repeat', backgroundImage:`url(${userInfo?process.env.REACT_APP_API_SERVER+userInfo.imgPath:userAvatar})`,backgroundSize:'cover'}}></div>
                <div>{donor}</div>
            </div>
            <div className='col-7 px-0'>
                <p>{content.intro}</p>
                <div className='d-flex justify-content-around'>
                <button disabled={localSolved||solved?true:false} className='btn btn-success' onClick={acceptFriend}>Accept</button>
                {(localSolved||solved)?null:<button onClick={handleIgnore} className='btn btn-danger'>Decline</button>}
                </div>
                
            </div>
            <div className='col-2 px-0'>
                {dateTime}
            </div>
        </div>
    )
}