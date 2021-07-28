import React, { useState } from 'react';
import EditGroupIcon from '../../img/editGroupIcon.png'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../stylesheet/friendsPage.css'
import { useDispatch } from 'react-redux';
import { updateFriendThunk } from '../../redux/friendsList/action';
import jwtDecode from 'jwt-decode';
const EditFriendGroup = (props) => {

    const [modal, setModal] = useState(false);
    const [check, setCheck] = useState({ Family: false, Work: false, School: false, ['Close Friends']: false });

    const toggle = () => setModal(!modal);
    const {
        friendsList,
        className,
        username
    } = props;

    const dispatch = useDispatch();
    const checked = (event) => {
        // const groupName = event.target.value
        const newCheck = { ...check }
        newCheck[event.target.value] = event.target.checked
        setCheck(newCheck)
        // console.log("this is check:", newCheck)
        // console.log("event target*******", event.target.checked)
    }

    const handleGroup = () => {
        let token = localStorage.getItem('token');
        let decode = jwtDecode(token);
        for (const [key, value] of Object.entries(check)) {
            console.log("FRIENDLIST:", friendsList[key]);
            console.log("USERNAME:", username);
            if (friendsList[key] && check[key] === true && !friendsList[key].includes(username)) {
                friendsList[key].push(username);
            }
            if (friendsList[key] && check[key] === false && friendsList[key].includes(username)) {
                const indexName = friendsList[key].indexOf(username)
                friendsList[key].splice(indexName, 1)
                console.log("newfriendslist", friendsList)
            }
        }
        dispatch(updateFriendThunk(friendsList,decode.username));
        setModal(!modal);
    }

    //console.log('EditGroup', friendsList);

    const handleClick = () => {
        // console.log("USERNAME:", username);
        // console.log("FRIENDSLIST:", friendsList)
        for (const [key, value] of Object.entries(check)) {
            console.log("FRIENDLIST:", friendsList[key]);
            console.log("USERNAME:", username);
            if (friendsList[key] && friendsList[key].includes(username)) {
                setCheck(prevValue => ({ ...prevValue, [key]: true }));
            }
        }
        toggle()
    }

    return (
        <div>
            <Button onClick={handleClick} className="editGroupButton"  ><img className="editGroupIcon" src={EditGroupIcon} alt="EditGroupIcon"  /></Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Assign group</ModalHeader>
                <ModalBody>

                    <input type="checkbox" checked={check.Family} onChange={checked} name="Family" value="Family" /> Family
                    <input type="checkbox" checked={check.Work} onChange={checked} name="Work" value="Work" /> Work
                    <input type="checkbox" checked={check.School} onChange={checked} name="School" value="School" /> School
                    <input type="checkbox" checked={check["Close Friends"]} onChange={checked} name="Close Friends" value="Close Friends" /> close friends

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleGroup}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}



export default EditFriendGroup;