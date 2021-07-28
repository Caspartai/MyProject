import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import userAvatar from '../../img/profileIcon.png';
import { updateNotificationAction } from "../../redux/notification/action";


export const EventNotiCard = (props)=>{
    const {noti} = props;
    const {solved} = noti;
    const history = useHistory();
    const dispatch = useDispatch();
    const socketStore = useSelector(state=>state.socketStore);
    const socket = socketStore.webSocket;
    const [localSolved,setLocalSolved] = useState(null);
    const [userInfo,setUserInfo] = useState(null);
    const [timeString,setTimeString] = useState(null);

    useEffect(()=>{
        //console.log('in like noti card',noti);
        let jwt = localStorage.getItem('token');
        async function getUserFunc(){
            let getUserReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/user/basic/'+noti.donor,
                headers:{Authorization:`Bearer ${jwt}`},
            })
            //console.log('get User res',getUserReq);
            setUserInfo(getUserReq.data);
        }
        if(noti.donor){
            getUserFunc();

        }
        let time =new Date(noti.created_at)
        setTimeString(time.toLocaleDateString()+' '+time.toLocaleTimeString())
        setLocalSolved(solved);
    },[noti.donor,noti.created_at,solved])
    const handleIgnore = async (e)=>{
        e.stopPropagation();
        let token = localStorage.getItem('token');
        try {
            let ignoreReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/noti/ignore/'+noti.id,
                headers:{Authorization:`Bearer ${token}`}
            })
            //console.log('ignoreReq',ignoreReq);
            if(ignoreReq.status===200){
                let newNoti = {
                    ...noti
                }
                newNoti.solved=true;
                dispatch(updateNotificationAction(newNoti));
                setLocalSolved(true);
            }
        } catch (error) {
            console.log('ignore friend req',error)
        }
        
    }
    const handleRedirect = ()=>{
        history.push(`/post/${noti.content.postId}`)
        //window.location.href='/post/'+noti.content.postId
    }
    const handleRedProfile = (e)=>{
        e.stopPropagation();
        history.push('/'+noti.donor)
        //window.location.href = '/'+noti.donor

    }
    const handleAccept = async (e)=>{
        e.stopPropagation();
        console.log('accept request');
        let token = localStorage.getItem('token');
        let decode = jwtDecode(token);
        try {
            let newData = {
                executor:noti.donor,
                post_id:noti.content.postId,
                noti_id:noti.id,
            }

            let acceptReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/schedule/accept',
                headers:{Authorization:`Bearer ${token}`},
                method:'post',
                data:newData
            })

            console.log('accept req res',acceptReq);
            if(acceptReq.status===200){
                let newNoti = {
                    ...noti
                }
                newNoti.solved=true;
                dispatch(updateNotificationAction(newNoti));
                setLocalSolved(true);
                socket.emit('acceptEvent',{donor:decode.username,recipient:noti.donor});

            }else{

            }
        } catch (error) {
            console.log('accept join req error',error);

        }
        
    }
    return (
        
        <div onClick={handleRedirect} style={{cursor:'pointer'}} >
            <div style={{backgroundColor:'#E3E3E3',border:'1px solid #303030'}} className='row mx-0 py-2'>
            <div className='col-1 px-0 pt-2'>
                <FontAwesomeIcon icon={faCalendarAlt}/>
            </div>
            <div className='col-2 px-0'>
                <div onClick={handleRedProfile} className='profileImgContainer' style={{borderRadius:'50%',backgroundRepeat:'no-repeat',backgroundPosition:'center',width:'50px',height:'50px', backgroundImage:`url(${userInfo?process.env.REACT_APP_API_SERVER+userInfo.imgPath:userAvatar})`,backgroundSize:'cover'}}></div>
                <div>{noti.donor}</div>
            </div>
            <div className='col-7 px-0'>
                <p>{noti.donor} want to join your event!</p>
                <div className='d-flex justify-content-around'>
                <button disabled={localSolved||solved?true:false} className='btn btn-success' onClick={handleAccept} >Accept</button>
                {(localSolved||solved)?null:<button onClick={handleIgnore} className='btn btn-danger'>Decline</button>}
                </div>
                
            </div>
            <div className='col-2 px-0'>
                {timeString}
            </div>
        </div>
        </div>
    )
}