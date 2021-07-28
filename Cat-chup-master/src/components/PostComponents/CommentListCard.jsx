import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import React from "react";
export const CommentListCard = (props) => {
  const { comment } = props;
  const [commentDetail, setCommentDetail] = useState(null);
  const [timeString, setTimeString] = useState(null);
  const [dateString, setDateString] = useState(null);
  useEffect(() => {
    async function commentFunc() {
      let token = localStorage.getItem("token");
      try {
        let getCommentReq = await axios({
          url:
            process.env.REACT_APP_API_SERVER + "/api/post/comment/" + comment,
          headers: { Authorization: `Bearer ${token}` },
        });
        //console.log('get comment res',getCommentReq);
        setCommentDetail(getCommentReq.data);
        let time = getCommentReq.data.created_at;
        setTimeString(new Date(time).toLocaleTimeString());
        setDateString(new Date(time).toLocaleDateString());
      } catch (error) {
        console.log("load comment detail error", error);
      }
    }
    commentFunc();
  }, [comment]);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt="Remy Sharp"
          src={
            commentDetail
              ? process.env.REACT_APP_API_SERVER + commentDetail.imgPath
              : null
          }
        />
      </ListItemAvatar>
      <ListItemText
        primary={commentDetail ? commentDetail.username : null}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              style={{ display: "inline" }}
              color="textPrimary"
            >
              <div>
                <div> {commentDetail ? commentDetail.content : null}</div>
                <div style={{ textAlign: "right" }}>
                  {dateString && timeString
                    ? dateString + " " + timeString
                    : null}
                </div>
              </div>
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};
