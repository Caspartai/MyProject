

import PostArea from "../components/PostArea";
import ScheduleRightBar from "../components/ScheduleRightBar";
import "../stylesheet/navBar.css";

import '../stylesheet/whatsOnYourMind.css'
import { CreatePostModal } from "../components/WhatsOnYourMindComponents/CreatePostModal";
import { CreatePostBtnContainer } from "../components/WhatsOnYourMindComponents/CreatePostBtnContainer";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../stylesheet/homePage.css";
import NoPostsOrEventsPlaceholder from "../components/PostComponents/NoPostsOrEventsPlaceholder";

const HomePage = (props) => {
  const postInfo = props.postInfo;
  const username = props.username;
  //console.log("props.postInfo:", props.postInfo);
  const postListStore = useSelector((state) => state.postListStore);
  const postList = postListStore.postList;
  const [postModal, setPostModal] = useState(false);
  const toggleModal = () => {
    setPostModal(!postModal);
  };

  return (
    <div
      className="col-9 px-0 mx-0 row post-and-schedule"
      // style={{ overflow: "scroll" }}
    >
      <div
        className="col-9 px-0 post-page Scrolllable"
        style={{ maxHeight: "100vh", backgroundColor: "#dfdfdf" }}
      >
        <CreatePostBtnContainer toggle={toggleModal} username={username} />
        {/* <WhatsOnYourMind /> */}

        {postList.length > 0 ? (
          <PostArea postInfo={postInfo} postList={postList} />
        ) : (
          //placeholder if no post/events exists
          <NoPostsOrEventsPlaceholder />
        )}
      </div>
      <div className="col-3 px-0 schedule-page" style={{ maxHeight: "100vh" }}>
        <ScheduleRightBar postInfo={postInfo} username={username} />
      </div>
      <CreatePostModal toggle={toggleModal} modal={postModal} />
    </div>
  );
};

export default HomePage;
