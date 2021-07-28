import { faComment} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import userAvatar from '../../img/profileIcon.png';

export const CommentNotiCard = (props)=>{
    const {noti} = props;
    const history = useHistory();
    const [userInfo,setUserInfo] = useState(null);
    const [timeString,setTimeString] = useState(null)
    useEffect(()=>{
        //console.log('in comment like',noti);
        let jwt = localStorage.getItem('token');
        async function getUserFunc(){
            let getUserReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/user/basic/'+noti.donor,
                headers:{Authorization:`Bearer ${jwt}`},
            })
            setUserInfo(getUserReq.data);
        }
        getUserFunc()
        let time = new Date(noti.created_at);
        setTimeString(time.toLocaleDateString()+' '+time.toLocaleTimeString())
    },[noti.created_at,noti.donor])
    const handleRedirect = ()=>{
        history.push('/post/'+noti.content.postId)
        //window.location.href = '/post/'+noti.content.postId;
    }
    const handleRedProfile = (e)=>{
        e.stopPropagation();
        history.push('/'+noti.donor)
        //window.location.href = '/'+noti.donor
    }
    return (
        <div  onClick={handleRedirect} style={{cursor:'pointer'}} >
            <div style={{backgroundColor:'#E3E3E3',border:'1px solid #303030'}} className='row mx-0 py-2'>
            <div className='col-1 px-0 pt-2'>
                <FontAwesomeIcon icon={faComment}/>
            </div>
            <div className='col-2 px-0'>
                <div onClick={handleRedProfile} className='profileImgContainer' style={{borderRadius:'50%',backgroundRepeat:'no-repeat',backgroundPosition:'center',width:'50px',height:'50px', backgroundImage:`url(${userInfo?process.env.REACT_APP_API_SERVER+userInfo.imgPath:userAvatar})`,backgroundSize:'cover'}}></div>
                <div>{noti.donor}</div>
            </div>
            <div className='col-7 px-0'>
                <p style={{color:'grey'}}>{noti.donor} commented your post</p>
                <p>{noti.content.comment}</p>
                
                
            </div>
            <div className='col-2 px-0'>
                {timeString?timeString:null}
            </div>
        </div>
        </div>
    )
}