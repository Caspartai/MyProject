import React from 'react';
import ProfileIcon from "../../img/profile_avatar.png"


const NotificationMessage = () => {

    return (
        <div class="list-group">
            {/* //onlclick get text to appear on right side */}
            <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                    <img className="notificationAvatar" src={ProfileIcon} alt="ProfileIcon"></img>
                    {/* <h5 class="mb-1">List group item heading</h5> */}
                    <p class="mb-1">Peter Griffin</p>
                    <small>1 days ago</small>
                </div>
                {/* <p class="mb-1">
                    Message 1
                </p> */}
                <small class="text-muted">Sent you a friend request.</small>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <img className="notificationAvatar" src={ProfileIcon} alt="ProfileIcon"></img>
                    <p class="mb-1">Jackie Chan</p>

                    <small class="text-muted">2 days ago</small>

                </div>
                {/* <p class="mb-1">
                    Message 2
                </p> */}
                <small class="text-muted">Sent you a friend request.</small>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <img className="notificationAvatar" src={ProfileIcon} alt="ProfileIcon"></img>
                    {/* <h5 class="mb-1">List group item heading</h5> */}
                    <p class="mb-1">King Phil</p>
                    <small class="text-muted">4 days ago</small>
                </div>
                {/* <p class="mb-1">
                    Message 3
                </p> */}
                <small class="text-muted">Sent you a friend request.</small>
            </a>
        </div>
    )
}

export default NotificationMessage;