import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { PersonalProfile } from "../components/profile/PersonalProfile";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import BackToTopButton from "../components/BackToTopButton";
import ScehduleRightBarPersonal from "../components/ScheduleRightBarPersonal";
import ProfilePost from "../components/profile/ProfilePost";
import { NotFriendBlackBlock } from "../components/NotFriendsComponents/NotFriendBlackBlock"
import { loadAllUsersThunk } from "../redux/allUsersInfo/action"
import NotExistingUserLogoBlock from "../components/NotFriendsComponents/NotExistingUserLogoBlock";
import NotExistingUserBlackBlock from "../components/NotFriendsComponents/NotExistingUserBlackBlock"
import NoPostsPlaceHolder from "../components/profile/NoPostPlaceHolder";

//check the route name, normally we just dive in by clicking own name
export const ProfilePage = (props) => {
    const [isOwner, setIsOwner] = useState(false);
    const [areFriends, setareFriends] = useState(false);
    const userStore = useSelector(state => state.userInfoStore);
    const friendListStore = useSelector(state => state.friendListStore);
    const allUsersStore = useSelector(state => state.allUsersListStore);
    //console.log('in profile page',userStore);
    const [userInfo,setUserInfo] = useState({}); 
    // const [usersList, setUsersList] = useState([])
    
    //console.log("ALL USERS STORE", allUsersStore)
    //console.log("owner",isOwner)
    //console.log("friends",areFriends)

    //set up post area
    
    const postListStore = useSelector(state=>state.postListStore);
    const postList = postListStore.postList;

        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(loadAllUsersThunk())
        }, [])

        // useEffect(() => {
        //     setUsersList(allUsersStore)
        // }, [allUsersStore])
        
    //need to check whether this user is friend with him
    useEffect(() => {
        //console.log('params', props.match.params.username);
        let pageOwnerName = props.match.params.username
        //first check is the user own this page;
        let jwt = localStorage.getItem('token');
        let decode = jwtDecode(jwt);
        let currentUserName = decode.username
        //check if it is owner
        if (pageOwnerName === currentUserName) {
            setIsOwner(true);
            setareFriends(false);
            setUserInfo(userStore.userInfo);
        }
        //check if they are friends
        if (friendListStore.friendList["All Friends"]) {
            async function FetchFriend() {
                let friendInfo = await axios({
                    url: process.env.REACT_APP_API_SERVER + '/api/user/profile/' + pageOwnerName,
                    headers: { Authorization: `Bearer ${jwt}` }
                });
                //console.log('friendInfo', friendInfo);
                setUserInfo(friendInfo.data);
                let allFriend = friendListStore.friendList["All Friends"];
                //console.log('friendList', friendListStore.friendList, allFriend);
                if (allFriend.find(e => e === pageOwnerName)) {
                    //console.log('are friends');
                    setareFriends(true);
                    setIsOwner(false)

                }
            }
            FetchFriend();

        }

        //and then check if they are friend?

    }, [userStore, friendListStore,props.match.params.username])


    //console.log("this is postlist*************",postList.length)
   

  
    return (
        <div className='col-9 px-0 row mx-0' style={{overflow:"hidden"}}>
            <div className='col-9 px-0' style={{backgroundColor:"rgb(223, 223, 223)",borderLeft:'1px solid #c4c4c4',borderRight:'1px solid #c4c4c4', position:"relative", height:"100vh"}}>
              {(allUsersStore.allUsersList.find((obj) => obj.username === props.match.params.username)) ? (
            <PersonalProfile
                            isOwner={isOwner}
                            userInfo={userInfo}
                            areFriends={areFriends}
                        
                        />):<NotExistingUserLogoBlock />}

            {(isOwner === true || areFriends === true) ? 

                ( postList.length > 0) ?
                <div className="Scrolllable" style={{overflow:"scroll", overflowX:"hidden",height:"67vh"}}>
                <ProfilePost
                postList={postList}
                isOwner={isOwner}
                areFriends={areFriends}
                pageOwner={props.match.params.username}
                />
                <BackToTopButton />

                </div>: <div><NoPostsPlaceHolder /></div>
                
        
            
            :(allUsersStore.allUsersList.find((obj) => obj.username === props.match.params.username) ? (
            <NotFriendBlackBlock
            pageOwnerName={props.match.params.username}
            areFriends={areFriends}

            />)
            : <NotExistingUserBlackBlock 
            pageOwnerName={props.match.params.username}
            areFriends={areFriends}/>)  
            }
          
            </div>

            <div className='col-3 px-0' style={{ maxHeight: "100vh", overflow:"scroll", overflowX:"hidden", position:"sticky", top:"0", backgroundColor:"white" }}>
              <ScehduleRightBarPersonal />
                
            </div>
            


            

        </div>
    )
}