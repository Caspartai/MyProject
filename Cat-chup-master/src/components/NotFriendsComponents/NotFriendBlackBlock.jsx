import React from "react"
import LockIcon from "../../img/lockIcon.png";

export const NotFriendBlackBlock = (props) => {
    const { pageOwnerName } = props

    return (
        <div className='col-12 px-0 row mx-0' style={{position:"absolute", bottom: "0"}}>
        <div  style={{
            height: "67vh",
            backgroundColor: "#434343", zIndex: "20"
        }}>
            <img style={{ marginTop: "40px" }} src={LockIcon} alt="lockIcon" />
            <p style={{ marginTop: "10px", color: "white" }}>You are not friends with {pageOwnerName}</p>
        </div >
        </div>
    )

}