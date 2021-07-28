import { useEffect } from "react";
import { useState } from "react";
import { ChatEngine } from "react-chat-engine"
import { useSelector } from "react-redux"
import { ChatSettingTop } from "../components/MessageComponents/ChatSettingTop";
import { CustomMessageBubble } from "../components/MessageComponents/CustomMessageBubble";


export const MessagePage = (props)=>{
    const userInfoStore = useSelector(state =>state.userInfoStore);
    const userInfo = userInfoStore.userInfo;
    const [username,setUsername] = useState(null);
    const [userSecret,setUserSecret]= useState(null);

    //console.log('user info',userInfo);
    useEffect(()=>{
        //console.log('refresh username');
        setUsername(userInfo.username);
        setUserSecret(userInfo.hash);
    },[userInfo])
    const renderNewChat = (creds)=>{
        //console.log('render new chat creds',creds);
        return null
    }
    const renderMessageBubble=(creds, chat, lastMessage, message, nextMessage)=>{
        //console.log('render chat setting',creds,chat);

        return (
            <CustomMessageBubble lastMessage={lastMessage} message={message} nextMessage={nextMessage} chat={chat} />
        )
    }
    return (
        <div className='col-9 px-0' style={{maxHeight:'100vh',overflow:'hidden',borderLeft:'1px solid #c4c4c4'}}>
            {username?<ChatEngine
                offset={8}
                height='100vh'
                userName={username?username:null}
                userSecret={userSecret?userSecret:null}
                projectID={process.env.REACT_APP_CHAT_PROJECTID}
                renderNewChatForm={renderNewChat}
                renderChatSettingsTop={ChatSettingTop}
                renderMessageBubble={renderMessageBubble}
            />:null}

          {/* {username?(<ChatEngineWrapper>

              <Socket
                projectID={process.env.REACT_APP_CHAT_PROJECTID}
                userName={username}
                userSecret={userSecret}
              />
              </ChatEngineWrapper>):null  } */}
        </div>
    )
}