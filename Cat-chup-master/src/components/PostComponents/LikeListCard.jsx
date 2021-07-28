import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const LikeListCard = (props) => {
  const { like } = props;
  const [likeDetail, setLikeDetail] = useState(null);
  const [timeString, setTimeString] = useState(null);
  const [dateString, setDateString] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log("inside like list card", like);
    async function getLikefunc() {
      let getLikeReq = await axios({
        url: process.env.REACT_APP_API_SERVER + "/api/post/like/" + like.likeId,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("getLIke res", getLikeReq);
      setLikeDetail(getLikeReq.data);
      let time = getLikeReq.data.created_at;
      setTimeString(new Date(time).toLocaleTimeString());
      setDateString(new Date(time).toLocaleDateString());
    }
    getLikefunc();
  }, [like]);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt="Remy Sharp"
          src={
            likeDetail
              ? process.env.REACT_APP_API_SERVER + likeDetail.imgPath
              : null
          }
        />
      </ListItemAvatar>
      <ListItemText
        primary={likeDetail ? likeDetail.username : null}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              style={{ display: "inline" }}
              color="textPrimary"
            >
              <div>
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
      <Divider variant="inset" component="li" />
    </ListItem>
  );
};
