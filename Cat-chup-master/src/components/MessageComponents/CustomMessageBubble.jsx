import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { MessageBubble } from "react-chat-engine";


export const CustomMessageBubble = ({creds, chat, lastMessage, message, nextMessage})=>{
    const [localChat,setLocalChat] = useState({}); 
    const [localMessage,setLocalMessage] = useState({});
    useEffect(()=>{
        
        async function changeAvatar(){
            let newChat = {};
            let jwt = localStorage.getItem('token');
            Object.assign(newChat,chat);
            let getUserInfoPromises = [];
            for(let i=0;i<chat.people.length;i++){
                getUserInfoPromises.push(axios({
                    url:process.env.REACT_APP_API_SERVER+'/api/user/profile/'+chat.people[i].person.username,
                    headers:{Authorization:`Bearer ${jwt}`}
                }))
                
            }
            let getUserInfoRes = await Promise.all(getUserInfoPromises);
            //console.log('getUserinfoRes',getUserInfoRes);
            for(let i=0;i<newChat.people.length;i++){
                newChat.people[i].person.avatar = process.env.REACT_APP_API_SERVER+getUserInfoRes[i].data.imgPath
            }
            let newMessage = {};
            Object.assign(newMessage,message);
            for(let i=0;i<getUserInfoRes.length;i++){
                if(message.sender.username===getUserInfoRes[i].data.username){
                    newMessage.sender.avatar=process.env.REACT_APP_API_SERVER+getUserInfoRes[i].data.imgPath
                }
            }
            setLocalMessage(newMessage);
            setLocalChat(newChat);
        }
        changeAvatar();
        
    },[chat,message])
            

    //console.log('inside custom message bubble',chat,message,lastMessage,nextMessage);
    return (
        <div>
            {(localChat.people)?<MessageBubble
            lastMessage={lastMessage}
            message={localMessage}
            nextMessage={nextMessage}
            chat={localChat}
        />:null}
        </div>
        
    )

}