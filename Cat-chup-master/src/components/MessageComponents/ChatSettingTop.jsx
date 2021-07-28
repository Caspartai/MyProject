import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";


export const ChatSettingTop = (creds,chat)=>{
    //console.log('chat setting top',chat);
    const [isOnline,setIsOnline] = useState(false);
    const [oppoInfo,setOppoInfo] = useState({});
    const history = useHistory()
    useEffect(()=>{
        let jwt = localStorage.getItem('token');
        let decode = jwtDecode(jwt);
        if(chat){
            let ownerName = decode.username;
        let peopleList = chat.people;
        let opponent;
        for(let i =0;i<peopleList.length;i++){
            if(peopleList[i].person.username!==ownerName){
                opponent=peopleList[i].person.username;
                setIsOnline(peopleList[i].person.is_online);
            };
        }
        async function getOppoFunc(){
            let friendInfoReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/user/profile/'+opponent,
                    headers:{Authorization:`Bearer ${jwt}`}
            });
            
            setOppoInfo(friendInfoReq.data);
        }
        getOppoFunc();
        }
        
    },[chat])
    const handleRedirect = ()=>{
        history.push('/'+oppoInfo.username)
        //window.location.href='/'+oppoInfo.username
    }
    if(chat){
        return (

            <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
                <div style={{marginBottom:'10px'}}>
                    <div onClick={handleRedirect} style={{cursor:'pointer',position:'relative',width:'50px',height:'50px',backgroundImage:`url(${oppoInfo?process.env.REACT_APP_API_SERVER+oppoInfo.imgPath:null})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center',borderRadius:'50%'}}>
                        <div style={{bottom:'0',right:'0',position:'absolute',width:'10px',height:'10px',backgroundColor:isOnline?'green':'red',borderRadius:'50%'}}></div>
                    </div>
                    <div style={{textAlign:'center'}}>{oppoInfo?oppoInfo.username:null}</div>
                </div>
                
            </div>
        )
    }
    else{
        return null
    }
    
}