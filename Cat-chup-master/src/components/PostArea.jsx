import "../stylesheet/postArea.css";
import BackToTopButton from "./BackToTopButton";
import PostCard from "./PostComponents/PostCard";
import { EventCardPostArea } from "./PostComponents/EventCardPostArea";

const PostArea = (props) => {
  const {postList} = props
  
  

  return (
    <div className="postContainer">
      
      {postList.map((post,index)=>{
        if(post.type==='post'){
          return (
            <PostCard
              postInfo={post}
              key={post.id}
            />
          )
        }
        if(post.type==='event'){
          return (
            <EventCardPostArea
              eventInfo={post}
              key={post.id}
            />
          )
        }
        return null;
        
      })}
      <BackToTopButton />
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

export default PostArea;
