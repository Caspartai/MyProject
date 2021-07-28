
// import React, { useState } from 'react';
import '../../stylesheet/friendsPage.css'
import DeleteFriend from './DeleteFriend'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteFriendModal = (props) => {
    const {
        buttonLabel,
        className,
        friendsList,
        toggle,
        modal
    } = props;


    return (
        <div>

            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Delete Friend</ModalHeader>
                <ModalBody>
                    Are you sure you want to Delete your Friend?
                </ModalBody>
                <ModalFooter>
                    <DeleteFriend friendsList={friendsList} />
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteFriendModal;