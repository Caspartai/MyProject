import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import userAvatar from '../../img/profileIcon.png';




export const AcceptEventCard = (props)=>{
    const {noti} = props;
    const history = useHistory();
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
    },[noti]);

    const handleRedirect = ()=>{
        history.push(`/post/${noti.content.postId}`)
        //window.location.href='/post/'+noti.content.postId
    }
    const handleRedProfile = (e)=>{
        e.stopPropagation();
        history.push('/'+noti.donor)
        //window.location.href = '/'+noti.donor

    }
    return (
        
        <div onClick={handleRedirect} style={{cursor:'pointer'}} >
            <div style={{backgroundColor:'#E3E3E3',border:'1px solid #303030'}} className='row mx-0 py-2'>
            <div className='col-1 px-0 pt-2'>
                <FontAwesomeIcon icon={faCalendarCheck}/>
            </div>
            <div className='col-2 px-0'>
                <div onClick={handleRedProfile} className='profileImgContainer' style={{borderRadius:'50%',backgroundRepeat:'no-repeat',backgroundPosition:'center',width:'50px',height:'50px', backgroundImage:`url(${userInfo?process.env.REACT_APP_API_SERVER+userInfo.imgPath:userAvatar})`,backgroundSize:'cover'}}></div>
                <div>{noti.donor}</div>
            </div>
            <div className='col-7 px-0'>
                <p>{noti.donor} accept your join event request!</p>
                
                
            </div>
            <div className='col-2 px-0'>
                {timeString}
            </div>
        </div>
        </div>
    )
}