import { useEffect } from "react";
import { useState } from "react";
import { Card, CardText, CardBody, CardLink, CardTitle } from "reactstrap";
import { PostImgShowcase } from "./PostImgShowcase";
import axios from "axios";
import LikeIcon from "../../img/like-icon.png";
import CommentIcon from "../../img/comment-icon.png";
import jwtDecode from "jwt-decode";
import MailIcon from "../../img/mail-icon.png";
import { makeStyles, TextField } from "@material-ui/core";
import { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePostAction } from "../../redux/post/action";

const useStyles = makeStyles((theme) => ({
  TextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    marginBottom: 10,
  },
}));

export const EventCardPostArea = (props) => {
  const classes = useStyles();
  const { eventInfo } = props;
  const dispatch = useDispatch();
  const socketStore = useSelector((state) => state.socketStore);
  const socket = socketStore.webSocket;
  const [likes, setLikes] = useState(null);
  const history = useHistory();
  let time = new Date(eventInfo.created_at);
  let postTime = time.toLocaleDateString() + " " + time.toLocaleTimeString();
  useEffect(() => {
    //console.log('event info in card',eventInfo);
    setLikes(eventInfo.content.likes);
  }, [eventInfo.content.likes]);

  const handleRedirect = () => {
    history.push(`/post/${eventInfo.id}`);
  };
  const handleRedProfile = (e) => {
    e.stopPropagation();
    history.push(`/${eventInfo.username}`);
  };
  const handleLiked = async (e) => {
    e.stopPropagation();
    //console.log('liked process');
    //console.log('like list',likes)
    let token = localStorage.getItem("token");
    let decode = jwtDecode(token);
    let username = decode.username;
    let match = false;
    match = likes.find((obj) => obj.user === username);
    //console.log('match like',match);
    if (match) {
      //cancel like
    } else {
      let sendLikedReq = await axios({
        url: process.env.REACT_APP_API_SERVER + "/api/post/like",
        data: { user: username, postId: eventInfo.id },
        headers: { Authorization: `Bearer ${token}` },
        method: "post",
      });
      //console.log('sendLike req',sendLikedReq);
      if (sendLikedReq.status === 200) {
        let newPost = {
          ...eventInfo,
        };
        newPost.content.likes = [...likes, sendLikedReq.data];
        dispatch(updatePostAction(newPost));
        setLikes([...likes, sendLikedReq.data]);
        socket.emit("like", { donor: username, recipient: eventInfo.id });
      }
    }
  };
  const handleJoin = async (e) => {
    //console.log('i want to join');
    e.stopPropagation();
    let token = localStorage.getItem("token");
    let decode = jwtDecode(token);
    //check if people want to join is themself

    let newNoti = {
      recipient: eventInfo.username,
      donor: decode.username,
      type: "join_event",
    };
    let content = {
      postId: eventInfo.id,
    };
    newNoti.content = content;
    try {
      let sendNotiReq = await axios({
        url: process.env.REACT_APP_API_SERVER + "/api/post/eventNoti",
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        data: newNoti,
      });
      //console.log('send Noti res',sendNotiReq);
      if (sendNotiReq.status === 200) {
        socket.emit("joinEvent", {
          donor: decode.username,
          recipient: eventInfo.username,
        });
        store.addNotification({
          title: "Join event request sent!",
          message: "Please wait for other people to confirmed your request",
          type: "success",
          insert: "top",
          container: "top-right",
          // animationIn:['animate__animated','animate__fadeIn'],
          // animationOut:['animate__animated','animate_fadeOut'],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      } else {
        store.addNotification({
          title: "Internal error",
          message: "Please try again later",
          type: "warning",
          insert: "top",
          container: "top-right",
          // animationIn:['animate__animated','animate__fadeIn'],
          // animationOut:['animate__animated','animate_fadeOut'],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      }
    } catch (error) {
      console.log("join event error", error);
    }
  };

  return (
    <div className="eventcard-container" onClick={handleRedirect}>
      <Card>
        <img
          onClick={handleRedProfile}
          className="userIcon"
          src={`${process.env.REACT_APP_API_SERVER + eventInfo.imgPath}`}
          alt="icon"
        />
        <span className="userName">
          <p style={{ fontSize: "25px", fontWeight: "600" }}>
            {" "}
            {eventInfo.username}{" "}
          </p>
        </span>
        {/* <div style={{borderRadius:"5px"}}className="mood"></div> */}
        <CardBody>
          <CardTitle tag="h5"> {eventInfo.content.title} </CardTitle>
          {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
        </CardBody>
        <CardBody>
          <div className="card-content">
            <CardText className="mt-0">{eventInfo.content.caption}</CardText>
            <div
              style={{
                marginBottom: "7px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TextField
                className={classes.textField}
                label="start time"
                type="datetime-local"
                value={eventInfo.content.start}
                disabled={true}
              />
              <TextField
                className={classes.textField}
                label="end time"
                type="datetime-local"
                value={eventInfo.content.end}
                disabled={true}
              />
            </div>

            {/* picture showcase */}
            <PostImgShowcase
              imageList={eventInfo.content.attachPic}
              height="300px"
            />
          </div>
          <CardLink onClick={handleJoin} style={{ cursor: "pointer" }}>
            {" "}
            <img src={MailIcon} alt="mail-icon" />{" "}
          </CardLink>
          <p className="create-date"> {postTime} </p>
        </CardBody>
        <div className="post-like-comment-button">
          <div>
            <button
              style={{
                fontSize: "24px",
                fontWeight: "700",
                border: "none",
                color: "white",
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "black",
                backgroundColor: "white",
              }}
              onClick={handleLiked}
            >
              <p>{likes ? likes.length : null} Like</p>
              <img src={LikeIcon} className="post-like-btn" alt="Like" />
            </button>
          </div>

          <div>
            <a
              style={{ textDecoration: "none" }}
              href={"/post/" + eventInfo.id}
            >
              <button
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  border: "none",
                  color: "white",
                  WebkitTextStrokeWidth: "1px",
                  WebkitTextStrokeColor: "black",
                  backgroundColor: "white",
                }}
              >
                <p>{eventInfo.content.comments.length} Comment</p>
                <img
                  src={CommentIcon}
                  className="post-comment-btn"
                  alt="Comment"
                />
              </button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};
