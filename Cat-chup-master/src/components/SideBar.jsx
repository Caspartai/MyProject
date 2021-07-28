import React from "react";

import { Nav, NavItem } from "reactstrap";
import homeIcon from "../img/homeIcon.png";
import friendsIcon from "../img/friendsIcon.png";
import notificationIcon from "../img/NotificationIcon.png";
import speechIcon from "../img/speechIcon.png";
import profileIcon from "../img/profileIcon.png";
import Logo from "../img/Catchup-Nav-logo.png";
import NavProfileBar from "./NavBarProfileBar";
import MyPlansToday from "./MyPlansToday";
import { NavLink } from "react-router-dom";
import "../stylesheet/navBar.css";
import { useSelector } from "react-redux";

const SideBar = (props) => {
  const postInfo = props.postInfo;
  const realTimeNotiStore = useSelector(state=>state.realTimeNotiStore);
  const notiList = realTimeNotiStore.notiList;
  //console.log('noti list in sidebar',notiList);
  const username = props.username;
  //console.log("sidebar", props.username);
  return (
    <div className="navContainer" style={{backgroundColor:"white"}}>
      {/* <Col xs="3" className="navIconLinkContainer px-0"> */}
      <div className="navIconLinkContainer">
        <img className="mainLogo" src={Logo} alt="MainLogo"></img>
        <br />

        <Nav vertical className="iconContainer">
          <NavItem className="flexIcon">
            <img src={homeIcon} alt="HomeIcon"></img>
            <NavLink id="home" exact to="/home" className="MainNavLink">
              <span className="MainHeadingHover">HOME</span>
            </NavLink>
          </NavItem>
          <NavItem className="flexIcon">
            <img src={friendsIcon} alt="FriendIcon"></img>
            <NavLink id="friends" exact to="/friends" className="MainNavLink">
              <span className="MainHeadingHover">FRIENDS</span>
            </NavLink>
          </NavItem>
          <NavItem className="flexIcon" style={{position:'relative'}}>
            {notiList&&notiList.length>0?<div style={{fontSize:'14px',paddingRight:'2px',position:'absolute',width:'23px',height:'23px',backgroundColor:'red',borderRadius:'50%',color:'white',textAlign:'center'}}>{notiList.length}</div>:null}
            <img src={notificationIcon} alt="NotitificationIcon"></img>
            <NavLink
              id="notification"
              exact
              to="/notifications"
              className="MainNavLink"
            >
              <span className="MainHeadingHover">NOTIFICATION</span>
            </NavLink>
          </NavItem>
          <NavItem className="flexIcon">
            <img src={speechIcon} alt="SpeechIcon"></img>
            <NavLink id="messages" exact to="/messages" className="MainNavLink">
              <span className="MainHeadingHover">MESSAGES</span>
            </NavLink>
          </NavItem>
          <NavItem className="flexIcon">
            <img src={profileIcon} alt="ProfileIcon"></img>
            <NavLink
              id="profile"
              exact
              to={`/${props.username}`}
              className="MainNavLink"
            >
              <span className="MainHeadingHover">PROFILE</span>
            </NavLink>
          </NavItem>
        </Nav>
      </div>

      {/* </Col> */}

      <MyPlansToday postInfo={postInfo} username={username} />

      <footer className="pt-2" style={{display:"flex", alignItems:"center", flexDirection: "column"}} >
        <NavProfileBar />
      </footer>
    </div>
  );
};

export default SideBar;
