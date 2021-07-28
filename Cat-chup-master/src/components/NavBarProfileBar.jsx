// import { render } from '@testing-library/react';
import React from 'react';
import { useSelector } from 'react-redux';
// import profileIcon from '../img/profileIcon.png'
import '../stylesheet/navBar.css'
import { useState } from 'react'
import Logout from './Logout';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const NavBarProfileBar = (props) => {
    const userStore = useSelector(state => state.userInfoStore)
    const userInfo = userStore.userInfo
    // console.log("this is userInfo: ", userInfo)
    // let toggle = false;
    const [toggle, setToggle] = useState(false)
    const toggleLogout = () => {
        // console.log("helloWorld")
        setToggle((prev) => !prev);
    }

    const handleClickAway = () => {
        setToggle(false);
    };

    return (
        <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
        >
            <div>
                <button onClick={toggleLogout} style={{ border: "none", background: "none", display:"flex" }}>
                    <div style={{
                        
                        width: '50px',
                        height: '50px',
                        padding: '0px',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url(${process.env.REACT_APP_API_SERVER + userInfo.imgPath})`,
                        backgroundSize: "cover", borderRadius: "50px"
                    }}>
                    </div>
                    <span style={{ verticalAlign: "20px", marginLeft: "10px", fontSize: "23px", fontWeight: "400" }}>{userInfo.username}</span>
                </button>
                {toggle && (
                    <div className="logoutToggle" style={{ position: "absolute", bottom: "60px", left: "100px" }}>
                        <Logout />
                    </div>
                )}
            </div>
        </ClickAwayListener>)
}


export default NavBarProfileBar;