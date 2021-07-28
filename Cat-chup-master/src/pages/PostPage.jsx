import "../stylesheet/commentPage.css";
import { useState } from "react";
import {
  Card,
  CardText,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import LikeIcon from "../img/like-icon.png";
import CommentIcon from "../img/comment-icon.png";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useEffect } from "react";
import GoBackButton from "../components/GoBackButton";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { PostImgShowcase } from "../components/PostComponents/PostImgShowcase";
import { LikeListCard } from "../components/PostComponents/LikeListCard";
import { CommentSection } from "../components/PostComponents/CommentSection";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePostAction } from "../redux/post/action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  TextField:{
    marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom:10
  }
}));




export const PostPage = (props)=>{
    const classes = useStyles();
  const [comment, setComment] = useState("");
  const [modal, setModal] = useState(false);
  const [Info,setPostInfo] = useState(null);
  const [comments,setComments] = useState(null);
  const [likes,setLikes] = useState(null);
  const history = useHistory();
  const socketStore = useSelector(state=>state.socketStore);
  const socket = socketStore.webSocket;
  const dispatch = useDispatch();
  const toggle = () => setModal(!modal);

  const postComment = (e) => {
    e.preventDefault();
    async function submitCommentFunc(){
        try {
            let token = localStorage.getItem('token');
            let decode = jwtDecode(token);
            let user = decode.username;

            let commentData = {
                user:user,
                comment:comment,
                postId:Info.id,
            }
            let submitCommentReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/post/comment',
                headers: { Authorization: `Bearer ${token}` },
                data:commentData,
                method:'post',
            })
            //console.log('submit Comment Res',submitCommentReq);
            let newPost = {
              ...Info,
              
            }
            newPost.content.comments=[...comments,submitCommentReq.data.commentId];
            dispatch(updatePostAction(newPost));
            socket.emit('comment',{donor:user,recipient:Info.username,comment:comment});
            setComments([...comments,submitCommentReq.data.commentId]);
        } catch (error) {
            console.log('submit comment function error',error)
        }
        

    }
    submitCommentFunc();
    setComment('');
    
  };
  const handleChange = (e)=>{
    setComment(e.target.value);
  }
  
  useEffect(()=>{
    //console.log("window", window.location.pathname);
    //console.log("path", props.match.params.postid);
    let postId = props.match.params.postid;
    async function getPostDetail(){
        let token = localStorage.getItem('token');
        let decode = jwtDecode(token);
        let getPostReq = await axios({
            url:process.env.REACT_APP_API_SERVER+'/api/post/'+postId+'/user/'+decode.username,
            headers: { Authorization: `Bearer ${token}` },
        })
        //console.log('get post res',getPostReq);
        setPostInfo(getPostReq.data);
        setLikes(getPostReq.data.content.likes);
        setComments(getPostReq.data.content.comments);
    }
    getPostDetail();
  },[props.match.params.postid])
  const handleLiked = async ()=>{
    //console.log('liked process');
    let token = localStorage.getItem('token');
    let decode = jwtDecode(token);
    let username = decode.username;
    let match = false;
    match = likes.find(obj=>obj.user===username)
    if(match){
      //cancel like
    }else{
      let sendLikedReq = await axios({
        url:process.env.REACT_APP_API_SERVER+'/api/post/like',
        data:{user:username,postId:Info.id},
        headers: { Authorization: `Bearer ${token}` },
        method:'post'
      })
      //console.log('sendLike req',sendLikedReq);
      if(sendLikedReq.status===200){
        //set thunk to change reducer
        let newPost = {
          ...Info,
          
        }
        newPost.content.likes=[...likes,sendLikedReq.data];
        dispatch(updatePostAction(newPost));
        setLikes([...likes,sendLikedReq.data])
        socket.emit('like',{donor:username,recipient:Info.username})
      }
      

    }
  }
  const handleRedProfile = (e)=>{
    e.stopPropagation();
    history.push('/'+Info.username)
    //window.location.href = '/'+Info.username
  }
  return (
    <div className="col-9 px-0 comment-part">
        <div >
            <div className='back-btn-container'>
            <GoBackButton/>
            </div>
        </div>
        <div className="comment-card">
        <Card>
                <img
                  onClick={handleRedProfile}
                  className="userIcon"
                  src={Info?process.env.REACT_APP_API_SERVER+Info.imgPath:null}
                  alt="icon"
                  style={{ width: "50px", height: "50px",cursor:'pointer' }}
                />
                <span className="userName">
                  <p style={{fontSize:"25px", fontWeight:"600"}}>{Info?Info.username:null}</p>
                </span>
                {/* <div style={{borderRadius: "5px"}} className="mood"></div> */}
                <CardBody></CardBody>
                <CardBody>
                  <div className="card-content">
                    <CardText style={{ marginTop: "30px" }}>
                      {Info?Info.content.caption:null}
                    </CardText>
                    {Info&&Info.type==='event'?
                      <div style={{marginBottom:'7px',display:'flex',flexDirection:'row','justifyContent':'space-around'}}>
                        <TextField
                          className={classes.textField}
                          label='start time'
                          type='datetime-local'
                          value={Info.content.start}
                          disabled={true}
                        />
                        <TextField
                        className={classes.textField}
                        label='end time'
                        type='datetime-local'
                        value={Info.content.end}
                        disabled={true}
                        />
                      </div>
                    :null}
                    <PostImgShowcase
                        imageList={Info?Info.content.attachPic:null}
                        height='500px'
                    />
                  </div>
                </CardBody>

                <div className="like-comment-button">
                  <div>
                    <button style={{ cursor: "context-menu" }}>
                      <p>{comments?comments.length:null}</p>
                      <p>Comment</p>
                      <img
                        src={CommentIcon}
                        className="comment-icon"
                        alt="Comment"
                      />
                    </button>
                  </div>

                  <div style={{ display: "flex" }}>
                    <button style={{ cursor: "default" }} onClick={toggle}>
                      <p>{likes?likes.length:null}</p>
                      <p>Like</p>
                    </button>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}>Likes</ModalHeader>
                      <ModalBody>
                        <List className={classes.root}>
                          {likes?likes.map((like, index) => {
                            return (
                                <LikeListCard
                                    like={like}
                                    key={like.likeId}
                                />
                            );
                          }):null}

                          
                        </List>
                      </ModalBody>
                    </Modal>

                    <img
                      style={{ cursor: "pointer" }}
                      src={LikeIcon}
                      className="like-icon"
                      alt="Like"
                      onClick={handleLiked}
                    />
                  </div>
                </div>

                

                <form style={{ display: "flex" }} onSubmit={postComment}>
                  <TextField
                    // label="Size"
                    variant="outlined"
                    size="small"
                    placeholder="add comment"
                    value={comment}
                    onChange={handleChange}
                    style={{ flex: "1" }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    
                    // onClick={postComment}
                    // disabled={!comment}
                    type="submit"
                  >
                    Send
                  </Button>
                </form>
                <div className="post-comments">
                  {/* <Comments Info={Info} /> */}
                          <CommentSection
                            comments={comments}
                          />
                </div>
              </Card>
      </div>

        
        
      
        
      

      
    </div>
  );
}