import axios from "axios";
import { useEffect, useState } from "react";
import "../../stylesheet/postArea.css";

import jwtDecode from "jwt-decode";
import PostCard from "../PostComponents/PostCard";
import { EventCardPostArea } from "../PostComponents/EventCardPostArea";

const ProfilePost = (props) => {
  const {isOwner,areFriends,pageOwner} = props
  const [postInfo,setPostInfo] = useState([]);

  useEffect(()=>{
    let token = localStorage.getItem('token');
    let decode = jwtDecode(token);
        let currentUserName= decode.username
    if(isOwner){
        
        async function getPostReq(){
            let postReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/post/user/'+pageOwner,
                headers:{Authorization:`Bearer ${token}`},
            })
            //console.log('get personal post req',postReq);
            setPostInfo(postReq.data);
        }
        getPostReq();
    }else if(areFriends){
        async function getPostReq(){
            let postReq = await axios({
                url:process.env.REACT_APP_API_SERVER+'/api/post/'+currentUserName+'/friend/'+pageOwner,
                headers:{Authorization:`Bearer ${token}`},
            })
            //console.log('get personal req',postReq);
            setPostInfo(postReq.data);
        }
        getPostReq();
    }
  },[isOwner,areFriends,pageOwner])
  return (
    <div className="postContainer">
      {/* {postInfo.map((info, index) => {
        if (info.type === "event") {
          return <EventPost postInfo={info} Key={info.id} />;
        }
        return <Post postInfo={info} Key={info.id} />;
      })} */}
      {/* {postList.map((post,index)=>{
        return (
          <PostCard
            postInfo={post}
            key={post.id}
          />
        )
      })} */}
      {postInfo.map((post,index)=>{
        if(post.type==='post'){
          return (
            <PostCard
              postInfo={post}
              key={post.id}
            />
          )
        }
        if(post.type==='event'){
          return <EventCardPostArea
            eventInfo={post}
            key={post.id}
          />
        }
        return null
          
      })}
    </div>

    // {imageList.map((image, index) => (
    //     <div key={index} className="image-item">
    //         <img src={image.data_url} alt="" width="100%" />
    //         <div className="image-item__btn-wrapper">
    //             <button onClick={() => onImageUpdate(index)}>Update</button>
    //             <button onClick={() => onImageRemove(index)}>Remove</button>
    //         </div>
    //     </div>
    // ))} }
  );
};

export default ProfilePost;