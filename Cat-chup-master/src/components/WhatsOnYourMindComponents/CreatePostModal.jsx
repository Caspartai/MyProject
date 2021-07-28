import { TextareaAutosize, Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PostEmoji from "../../img/post_smile-emoji_icon.png";
import UploadImageIcon from "../../img/upload_imageIcon.png";
import ReactImageUploading from "react-images-uploading";
import { PostImageShowcase } from "./PostImageShowcase";
import { EmojiPopper } from "./EmojiPopper";
import { useRef } from "react";
import { addNewPostThunk } from "../../redux/post/action";
import FriendGroupSelector from "./FriendGroupSelector";
import { makeStyles } from "@material-ui/core";
import toEventIcon from "../../img/toEvent.png";
import notEventIcon from "../../img/notEvent.png";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    marginBottom: 10,
  },
  title: {
    border: "none",
    width: "100%",
    marginBottom: "5px",
  },
}));

export const CreatePostModal = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { className, toggle, modal } = props;
  const userInfoStore = useSelector((state) => state.userInfoStore);
  const userInfo = userInfoStore.userInfo;

  //FOR EMOJI PICKER POPPER
  const [anchorEl, setAnchorEl] = useState(null);
  const showEmojiPicker = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };
  const cursorRef = useRef(null);
  const onEmojiClick = (e, emojiObject) => {
    const cursor = cursorRef.current.selectionStart;
    const text =
      formik.values.caption.slice(0, cursor) +
      emojiObject.emoji +
      formik.values.caption.slice(cursor);
    formik.setFieldValue("caption", text);
  };
  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;
  const closeEmojiPicker = () => {
    //console.log('try to close emoji')
    setAnchorEl(null);
  };

  //FOR VISIBLE FRIEND GROUP SELECTOR
  const friendListStore = useSelector((state) => state.friendListStore);
  const friendList = friendListStore.friendList;
  //console.log('friendList',friendList);

  //FOR FORMIK FORM CONTROL
  let initialTime = new Date(Date.now());
  initialTime.setHours(initialTime.getHours() + 8);
  const formik = useFormik({
    initialValues: {
      caption: "",
      attachPic: [],
      ownerName: userInfo.username,
      visible_group: Object.keys(friendList)[0],
      type: "post",
      start: initialTime.toISOString().slice(0, -5),
      end: initialTime.toISOString().slice(0, -5),
      title: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(addNewPostThunk(values));
      toggle();
    },
  });
  const setImageChange = (imageList) => {
    formik.setFieldValue("attachPic", imageList);
  };
  // for event toggle
  const [isEvent, setIsEvent] = useState(false);
  const toEvent = (e) => {
    //console.log('toggle to event',formik.values.type);
    if (isEvent) {
      formik.setFieldValue("type", "post");
      setIsEvent(!isEvent);
    } else {
      formik.setFieldValue("type", "event");
      setIsEvent(!isEvent);
    }
  };

  useEffect(() => {
    let initialTime = new Date(Date.now());
    initialTime.setHours(initialTime.getHours() + 8);
    let friendGroup = Object.keys(friendList);
    //setUserInfo(userInfoStore.userInfo);
    //console.log('i am reset')
    //console.log('try to coporate time',new Date(Date.now()).toISOString());
    formik.resetForm({
      values: {
        caption: "",
        attachPic: [],
        ownerName: userInfo.username,
        visible_group: friendGroup[0],
        type: "post",
        start: initialTime.toISOString().slice(0, -8),
        end: initialTime.toISOString().slice(0, -8),
        title: "",
      },
    });
    setIsEvent(false);
  }, [userInfo.username, modal, friendList]);
  return (
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>{isEvent ? "Event" : "Post"}</ModalHeader>
      <ModalBody className="px-4">
        <div className="row">
          <div
            style={{
              backgroundImage: `url(${
                userInfo
                  ? process.env.REACT_APP_API_SERVER + userInfo.imgPath
                  : null
              })`,
              width: "50px",
              height: "50px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
            className="col-3"
          ></div>
          <div className="col-3">
            <h4 className="pt-2">{userInfo ? userInfo.username : null}</h4>
          </div>
        </div>
        <div className="mt-2">
          <form id="post-form" onSubmit={formik.handleSubmit}>
            {isEvent ? (
              <TextField
                autoComplete="off"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={"What are you planning to do?"}
                type="text"
                className={classes.title}
                required
              />
            ) : null}
            <TextareaAutosize
              ref={cursorRef}
              className="message-textarea"
              placeholder={`What's on your mind, ${
                userInfo ? userInfo.username : null
              }?`}
              id="caption"
              name="caption"
              value={formik.values.caption}
              onChange={formik.handleChange}
              required
            />
            {/* TODO:// use a portal tag to wrap it so don't need to put inside */}
            <ReactImageUploading
              multiple
              value={formik.values.attachPic}
              onChange={setImageChange}
              maxNumber={4}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => {
                return (
                  <div>
                    <PostImageShowcase
                      imageList={imageList}
                      onImageRemove={onImageRemove}
                    />

                    <FriendGroupSelector
                      friendGroup={Object.keys(friendList)}
                      selectedGroup={formik.values.visible_group}
                      handleSelect={formik.handleChange}
                    />
                    <hr className="my-0" />
                    {isEvent ? (
                      <div
                        style={{
                          marginTop: "7px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <TextField
                          id="start"
                          name="start"
                          label="start time"
                          type="datetime-local"
                          value={formik.values.start}
                          onBlur={formik.handleBlur}
                          className={classes.textField}
                          onChange={formik.handleChange}
                          inputProps={{ style: { fontSize: "0.92rem" } }}
                        />
                        <TextField
                          id="end"
                          name="end"
                          label="end time"
                          type="datetime-local"
                          value={formik.values.end}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={classes.textField}
                          inputProps={{
                            min: formik.values.start,
                            style: { fontSize: "0.92rem" },
                          }}
                        />
                      </div>
                    ) : null}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        flexDirection: "row",
                        marginTop: "5px",
                      }}
                    >
                      {/* <div
                        className="add-on-function-post-btn"
                        style={{ backgroundImage: `url(${MoodIcon})` }}
                      ></div>
                      <div
                        className="add-on-function-post-btn"
                        style={{ backgroundImage: `url(${IncognitoIcon})` }}
                      ></div> */}
                      {!isEvent ? (
                        <div
                          className="add-on-function-post-btn"
                          onClick={toEvent}
                          style={{
                            cursor: "pointer",
                            backgroundImage: `url(${toEventIcon})`,
                            backgroundSize: "28px",
                          }}
                        ></div>
                      ) : (
                        <div
                          className="add-on-function-post-btn"
                          onClick={toEvent}
                          style={{
                            cursor: "pointer",
                            backgroundImage: `url(${notEventIcon})`,
                            backgroundSize: "28px",
                          }}
                        ></div>
                      )}

                      <div
                        className="add-on-function-post-btn add-on-emoji-btn"
                        onClick={showEmojiPicker}
                        onBlur={closeEmojiPicker}
                        style={{ backgroundImage: `url(${PostEmoji})` }}
                      ></div>
                      <div
                        className="add-on-function-post-btn"
                        onClick={onImageUpload}
                        style={{
                          backgroundImage: `url(${UploadImageIcon})`,
                          cursor: "pointer",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              }}
            </ReactImageUploading>
            <EmojiPopper
              id={id}
              open={open}
              anchorEl={anchorEl}
              onEmojiClick={onEmojiClick}
            />
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className="mx-2"
          variant="outlined"
          type="submit"
          form="post-form"
          color="primary"
        >
          Post
        </Button>{" "}
        <Button variant="outlined" color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
