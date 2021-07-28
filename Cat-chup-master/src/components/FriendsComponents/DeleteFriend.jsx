import React from 'react';
import '../../stylesheet/friendsPage.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { deleteFriendThunk } from '../../redux/friendsList/action';
import jwtDecode from 'jwt-decode';

const DeleteFriend = (props) => {
    const {
        className,
        toggle,
        modal,
        username
    } = props;
    const dispatch = useDispatch();

    const deleteConfirm = () => {

        let token = localStorage.getItem('token');
        let decode = jwtDecode(token);
        let deleteRelation = {
            actionOwner: decode.username,
            friend: username
        }
        dispatch(deleteFriendThunk(deleteRelation))
        toggle();
    }

    return (
        <div>

            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Delete Friend</ModalHeader>
                <ModalBody>
                    Are you sure you want to Delete your Friend {username}?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteConfirm}>Delete Friend</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteFriend;