import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { Row, Col, Card, CardTitle } from "reactstrap";
import MailIcon from "../../img/mail-icon.png";
import { store } from "react-notifications-component";
import { useSelector } from "react-redux";




function dateIs(date2) {
  return new Date(date2);
}

const EventCardSchedule = (props) => {
  const Info = props.Info;
  const socketStore = useSelector(state=>state.socketStore);
  const socket = socketStore.webSocket
  function getDayOfWeek(date) {
    var week;
    if (date.getDay() === 0) week = "SUN";
    if (date.getDay() === 1) week = "MON";
    if (date.getDay() === 2) week = "TUE";
    if (date.getDay() === 3) week = "WED";
    if (date.getDay() === 4) week = "THU";
    if (date.getDay() === 5) week = "FRI";
    if (date.getDay() === 6) week = "SAT";
    return week;
  }
  const handleJoin = async () => {
    //console.log("i want to join");
    let token = localStorage.getItem("token");
    let decode = jwtDecode(token);

    //check if people want to join is themself

    let newNoti = {
      recipient: Info.username,
      donor: decode.username,
      type: "join_event",
    };
    let content = {
      postId: Info.id,
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
        socket.emit('joinEvent',{donor:decode.username,recipient:Info.username});
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
    <div>
      <Card
        body
        style={{
          padding: "0px 10px",
          margin: "2px 10px 2px 10px",
          border: "2px solid #79D7F6",
          backgroundColor: "#D4E9F0",
        }}
      >
        <Row>
          <Col xs="2">
            <img
              src={process.env.REACT_APP_API_SERVER + Info.imgPath}
              alt="icon"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                marginTop: "10px",
              }}
            />
            <p
              className="username"
              style={{
                fontSize: "12px",
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                width: "100px",
              }}
            >
              {Info.username}
            </p>
          </Col>
          <Col xs="10">
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  display: "flex",
                  justifyContent: "space-between",
                  height: "14px",
                }}
              >
                <p
                  className="time"
                  style={{
                    marginLeft: "20px",
                    justifyContent: "flex-start",
                    display: "flex",
                  }}
                >
                  {getDayOfWeek(dateIs(Info.content.start))} &nbsp;
                </p>
                <p
                  style={{
                    marginBlockEnd: "auto",
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100px",
                  }}
                >
                  {new Date(Info.content.start)
                    .toLocaleString("en-GB")
                    .slice(0, -10) + new Date(Info.content.start)
                    .toLocaleString("en-GB")
                    .slice(11, -3)}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "22px",
                }}
              >
                <p
                  className="time"
                  style={{
                    marginBlockEnd: "auto",
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {new Date(Info.content.end)
                    .toLocaleString("en-GB")
                    .slice(0, -10) + new Date(Info.content.end)
                    .toLocaleString("en-GB")
                    .slice(11, -3)}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <CardTitle style={{ marginLeft: "14px" }} tag="h6">
                  {Info.content.title}
                </CardTitle>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>
                    <img
                      src={MailIcon}
                      alt="mail-icon"
                      style={{
                        width: "20px",
                        height: "20px",
                        bottom: "5px",
                        position: "relative",
                      }}
                      onClick={handleJoin}
                    />
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div style={{ display: "flex" }}>
          {/* <div>
                  {Info.content.tags.map((tag, index) => (
                    <p className="event-tag">{tag}</p>
                  ))}
                </div> */}
        </div>
      </Card>
    </div>
  );
};

export default EventCardSchedule;
