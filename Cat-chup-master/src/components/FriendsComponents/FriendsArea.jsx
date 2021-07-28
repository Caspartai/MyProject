import { useState } from "react";
import {
    Container, Row
} from 'reactstrap';

import '../../stylesheet/friendsPage.css'
import DeleteFriend from "./DeleteFriend";
import FriendSearchBar from "./FriendSearchBar";
import BackToTopButton from "../BackToTopButton";
import { FriendCard } from "./FriendCard"


const FriendsArea = (props) => {


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const deleteBtnToggle = (e) => {
        toggle();
        //console.log('trigger', e.target.getAttribute('name'));
        setOnDeleteUser(e.target.getAttribute('name'));
    }
    const { friendsList, activeTab} = props
    //console.log("Friends List from active tab:", friendsList[activeTab])
    //console.log('friendsList from friends area', friendsList, "active tab", activeTab, index);
    const [searchResult, setSearchResult] = useState("");
    const [onDeleteUser, setOnDeleteUser] = useState(null)
    //console.log("SEARCH RESULT:", typeof searchResult)



    return (
        <div className="FriendsContentContainer">
            <Container>
                <Row className="mx-0">

                    <center className="friendAreaTopSection">
                        <FriendSearchBar searched={(value) => setSearchResult(value)} localFriendsList={friendsList[activeTab]} />



                    </center>


                    <DeleteFriend toggle={toggle} modal={modal} username={onDeleteUser} />
                    {
                        searchResult === "" || searchResult.length === 0 ? friendsList[activeTab] && friendsList[activeTab].map((friend, index) => {
                            return (

                                <FriendCard

                                    username={friend}
                                    key={friend}
                                    toggle={deleteBtnToggle}
                                    activeTab={activeTab}
                                    friendsList={friendsList}
                                />

                            )
                        }) :
                            friendsList[activeTab] && friendsList[activeTab].filter(newfriendsList => {
                                if (newfriendsList.toLowerCase().includes(searchResult)) return newfriendsList
                                else return false;
                            }).map((friend, index) => {
                                // console.log("FRIENDS LIST III:", friend);
                                return (
                                    <FriendCard
                                        username={friend}
                                        key={index}
                                        toggle={deleteBtnToggle}
                                        activeTab={activeTab}
                                        friendsList={friendsList}
                                    />

                                )
                            })


                    }
                </Row>

            </Container >








            <BackToTopButton />





        </div >)
}


export default FriendsArea;