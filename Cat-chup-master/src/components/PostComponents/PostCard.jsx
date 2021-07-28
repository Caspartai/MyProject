import { useState } from "react";
import { Card, CardText, CardBody, CardTitle} from "reactstrap";
import LikeIcon from "../../img/like-icon.png";
import CommentIcon from "../../img/comment-icon.png";
import { PostImgShowcase } from "./PostImgShowcase";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { updatePostAction } from "../../redux/post/action";
import { useDispatch, useSelector } from "react-redux";

const PostCard = (props) => {
  const { postInfo } = props;
  //console.log('post info',postInfo);
  const dispatch = useDispatch();
  const [likes,setLikes] = useState(null);
  const history = useHistory();
  const socketStore = useSelector(state=>state.socketStore);
  const socket = socketStore.webSocket;
  let time = new Date(postInfo.created_at);
  let postTime = time.toLocaleDateString() + " " + time.toLocaleTimeString();

  const changeToCommentPage = () => {
    history.push("post/" + postInfo.id)
    //window.location.href = "post/" + postInfo.id;
  };
  useEffect(() => {
    setLikes(postInfo.content.likes)
    //setLikeNumber(postInfo.content.likes.length);
  }, [postInfo.content.likes]);
  const handleLiked = async (e) => {
    e.stopPropagation();

    //console.log("liked process",postInfo);
    let token = localStorage.getItem("token");
    let decode = jwtDecode(token);
    let username = decode.username;
    let match = false;
    
    match = likes.find((obj) => obj.user === username);
    if (match) {
      //cancel like
    } else {
      let sendLikedReq = await axios({
        url: process.env.REACT_APP_API_SERVER + "/api/post/like",
        data: { user: username, postId: postInfo.id },
        headers: { Authorization: `Bearer ${token}` },
        method: "post",
      });
      console.log("sendLike req", sendLikedReq);
      if (sendLikedReq.status === 200) {
        //setLikeNumber(likeNumber + 1);
        let newPost = {
          ...postInfo,
          
        }
        newPost.content.likes=[...likes,sendLikedReq.data];
        dispatch(updatePostAction(newPost));
        setLikes([...likes,sendLikedReq.data]);
        socket.emit('like',{donor:username,recipient:postInfo.id})
      }
    }
  };
  const handleRedProfile = (e) => {
    e.stopPropagation();
    history.push("/" + postInfo.username)
    //window.location.href = "/" + postInfo.username;
  };

  return (
    <div
      className="postcard-container"
      onClick={changeToCommentPage}
      style={{ cursor: "pointer" }}
    >
      <Card>
        <img
          onClick={handleRedProfile}
          className="userIcon"
          src={`${process.env.REACT_APP_API_SERVER + postInfo.imgPath}`}
          alt="icon"
        />
        <span className="userName">
          <p style={{fontSize:"25px", fontWeight:"600"}}> {postInfo.username} </p>
        </span>
        {/* <div style={{borderRadius:"5px"}} className="mood"></div> */}
        <CardBody>
          <CardTitle tag="h5"> {"post"} </CardTitle>
        </CardBody>
        <CardText>{postInfo.content.caption}</CardText>
        <CardBody>
          <div className="card-content">
            <PostImgShowcase
              imageList={postInfo.content.attachPic}
              height="300px"
            />
            {/* <PostImgBox Picture={'content.pictures'} /> */}
            {/* {content.pictures.map((picture, index) => (
              <PostImgBox Picture={content.pictures} />
              // <img width="100%" src={picture.data_url} alt="Card image cap" />
            ))} */}
          </div>
        </CardBody>
        <p className="create-date"> {postTime} </p>

        <div className="post-like-comment-button">
          <div>
            <button style={{fontSize:"24px", fontWeight:"700",border:"none", color:"white",WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor:"black", backgroundColor:"white"}} onClick={handleLiked}>
              <p>{likes?likes.length:null} Like</p>
              <img src={LikeIcon} className="post-like-btn" alt="Like" />
            </button>
          </div>

          <div>
              <button style={{fontSize:"24px", fontWeight:"700",border:"none", color:"white",WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor:"black", backgroundColor:"white"}}>
                <p>{postInfo.content.comments.length} Comment</p>
                <img
                  src={CommentIcon}
                  className="post-comment-btn"
                  alt="Comment"
                />
              </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostCard;
