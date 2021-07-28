
// import SideBar from "../components/SideBar";
// import { Container, Row, Col } from 'reactstrap';
import NotificationHeader from "../components/NotificationComponents/NotificationHeader";


import '../stylesheet/navBar.css'
import '../stylesheet/notificationPage.css'
import { FriendRequestNotiCard } from '../components/NotificationComponents/FriendRequestNotiCard'
import { useState } from "react";
import { LikedNotiCard } from "../components/NotificationComponents/LikedNotiCard";
import { CommentNotiCard } from "../components/NotificationComponents/CommentNotiCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ScehduleRightBarPerosnal from "../components/ScheduleRightBarPersonal";
import { EventNotiCard } from "../components/NotificationComponents/EventNotiCard";
import BackToTopButton from "../components/BackToTopButton";
import NoNotifications from "../components/NotificationComponents/NoNotifications";
import { clearAllNotiAction } from "../redux/real_time_noti/action";
import jwtDecode from "jwt-decode";
import { AcceptEventCard } from "../components/NotificationComponents/AcceptEventCard";
// import FriendsArea from "../components/FriendsComponents/FriendsArea";
// import { useEffect } from "react";



const NotificationPage = () => {
    const notiStore = useSelector(state => state.notiListStore)
    const socketStore = useSelector(state=>state.socketStore);
    const socket = socketStore.webSocket;
    const [notiList, setNotiList] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        //console.log('inside notification page',notiStore.notiList.length);
        setNotiList(notiStore.notiList);
    }, [notiStore])
    useEffect(()=>{
        dispatch(clearAllNotiAction());
        let token = localStorage.getItem('token');
        let decode = jwtDecode(token);
        if(socket){
            socket.emit('clearNoti',decode.username);
        }
        
    },[])

    const notiPageLength = notiStore.notiList.length

    // console.log("not link************************",notiPageLength)
    return (

        
        <div className="col-9 px-0 mx-0 row notificationOverflow">
            <div className="col-9 px-0" style={{backgroundColor:"#dfdfdf", overflow:"hidden", height:"100vh"}}>
                <NotificationHeader  />


                {(notiPageLength > 0) ?(
                    
                    <div className="Scrolllable"style={{overflow:"scroll",height:"91%"}} >
                {
                    notiList.map((noti, index) => {
                        if (noti.type === 'friend_request') {
                            return <FriendRequestNotiCard
                                key={noti.id}
                                noti={noti}
                            />
                        }
                        if (noti.type === 'like'){
                            return <LikedNotiCard
                                noti={noti}
                                key={noti.id}
                            />
                        }
                        if(noti.type === 'comment'){
                            return <CommentNotiCard
                                noti={noti}
                                key={noti.id}
                            />
                        }
                        if(noti.type==='join_event'){
                            return <EventNotiCard
                                noti={noti}
                                key={noti.id}
                            />
                        }
                        if(noti.type==='accept_event'){
                            return <AcceptEventCard
                                noti={noti}
                                key={noti.id}
                            />
                        }
                        return null;
                    })
                }
                {/* <NotificationBody /> */}

                {/* <LikedNotiCard/>
                <CommentNotiCard/> */}
                {/* <EventNotiCard/> */}
                <BackToTopButton />

                </div>

                ):
                <NoNotifications />}
            </div>



            <div className='col-3 px-0' style={{ maxHeight: "100vh", overflow:"scroll", overflowX:"hidden", position:"sticky", top:"0",backgroundColor:"white" }}>
            <ScehduleRightBarPerosnal />
        

            </div>
        </div>
    )
}


export default NotificationPage;