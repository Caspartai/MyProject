import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import EditFriendGroup from "./EditFriendGroup";
import {
    Card, CardBody
} from 'reactstrap';
import userAvatar from '../../img/profileIcon.png';
import { useHistory } from 'react-router-dom';

export const FriendCard = (props) => {
    const { username, toggle } = props
    const history = useHistory();
    const [userInfo, setUserInfo] = useState(null);
    const { friendsList, activeTab } = props
    useEffect(() => {
        async function getUserInfo() {
            let jwt = localStorage.getItem('token');
            let getUserReq = await axios({
                url: process.env.REACT_APP_API_SERVER + '/api/user/profile/' + username,
                headers: { Authorization: `Bearer ${jwt}` },
            })
            //console.log('getUserReq', getUserReq);
            setUserInfo(getUserReq.data);
        }
        getUserInfo();
    }, [username])
    const handleRedProfile= ()=>{
        history.push('/'+userInfo.username);
    }
    return (
        <div className='col-6'>

            <Card className="friendsAreaComponent">

                <CardBody className="friendCardBody row mx-0">
                    <div className='col-3 px-0' style={{ padding: '10px', width: '60px', height: '60px', borderRadius: '50%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${userInfo ? process.env.REACT_APP_API_SERVER + userInfo.imgPath : userAvatar})`, backgroundSize: 'cover' }}>

                    </div>
                    <div className='col-6 px-0' >
                        <span style={{ fontSize: "25px", color: "black", textDecoration: "none",cursor:'pointer' }} onClick={handleRedProfile}>{username}</span>
                    </div>
                    {activeTab === "All Friends" &&
                        <EditFriendGroup username={username} activeTab={activeTab} friendsList={friendsList} />}
                    <button className="deleteFriendBtn" onClick={toggle} name={username}></button>


                </CardBody>
            </Card>

        </div>
    )
}