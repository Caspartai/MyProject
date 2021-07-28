import "../../stylesheet/schedulePage.css";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { useEffect } from "react";
import { TextField } from "@material-ui/core";
import axios from "axios";

const ScheduleDetail = (props) => {
  const selected = props.scheduleList;
  const [selectedText, setSelectedText] = useState(selected.content.caption);
  let startTime = new Date(selected.start);
  let endTime = new Date(selected.end);
  startTime.setHours(startTime.getHours() + 8);
  endTime.setHours(endTime.getHours() + 8);
  const [selectedStartTime, setselectedStartTime] = useState(
    startTime.toISOString().slice(0, -5)
  );
  const [selectedEndTime, setselectedEndTime] = useState(
    endTime.toISOString().slice(0, -5)
  );

  useEffect(() => {
    //console.log(selected);
    //console.log('schedule detail start time',selected.start)
    // this moment : scheduleList = []
    // this moment : scheduleList = [{type:'schedule'}]
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "start") {
      //console.log(e.target);
      setselectedStartTime(e.target.value);
    }
    if (e.target.name === "end") {
      //console.log(e.target);
      setselectedEndTime(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    try {
      let updatedSchedule = {
        ...selected,
      };
      updatedSchedule.start = selectedStartTime;
      updatedSchedule.end = selectedEndTime;
      updatedSchedule.content.caption = selectedText;
      let updateScheduleReq = await axios({
        url: process.env.REACT_APP_API_SERVER + "/api/schedule",
        headers: { Authorization: `Bearer ${token}` },
        method: "put",
        data: updatedSchedule,
      });
      console.log("updatedSchedule res", updateScheduleReq);
      if (updateScheduleReq.status === 200) {
      }
    } catch (error) {
      console.log("update schedule error", error);
    }

    // => [{type:'schedule'}, {}, {}]

    //gets the input data here
    // console.log("selected date",selectedDate)
    // console.log("selected text",selectedText)
    // console.log("selected StartTime",selectedStartTime)
    // console.log("selected endtime",selectedEndTime)
  };
  //console.log(schedule);
  // console.log(selected.content.pictures);
  //console.log(new Date(schedule.end).toLocaleString().slice(0, -10));
  return (
    <div
      className={
        "postId" +
        selected.id +
        " " +
        "schedule_detail_box" +
        " " +
        "display-none"
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <div
            style={{
              fontSize: "32px",
              backgroundColor: "#96d9ff",
              height: "82px",
              borderLeft: "1px solid #c4c4c4",
            }}
          >
            {selected.content.title}
          </div>

          {/* //if event conditional render */}
          {/* //Event */}
          {/* //Schedule */}

          {selected.type === "event" ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "black", backgroundColor: "grey" }}>
                Event by {selected.creator}
              </p>
              {selected.type === "event" && selected.content.attachPic[0] ? (
                <div>
                  <img
                    style={{ width: "80%" }}
                    src={
                      process.env.REACT_APP_API_SERVER +
                      selected.content.attachPic[0]
                    }
                    alt="pic"
                  ></img>
                </div>
              ) : null}
            </div>
          ) : null}

          <div
            style={{
              textAlign: "start",

              paddingTop: "10px",
            }}
          >
            {" "}
            {/* {selected.content.eventDateWeek} */}
          </div>

          <TextField
            name="start"
            label="start time"
            type="datetime-local"
            value={selectedStartTime}
            disabled={true}
            className="start-field"
            // onBlur={formik.handleBlur}
            // className={classes.textField}
            onChange={handleChange}
          />
          <TextField
            name="end"
            label="end time"
            type="datetime-local"
            value={selectedEndTime}
            onChange={handleChange}
            disabled={true}
            className="end-field"
            // onBlur={formik.handleBlur}
            // className={classes.textField}
          />
          <div
            style={{
              textAlign: "start",
              marginTop: "30px",
              padding: "0 10px",
            }}
          >
            <textarea
              required
              onChange={(e) => setSelectedText(e.target.value)}
              value={selectedText}
              style={{ resize: "none", height: "35vh", width: "100%" }}
              disabled={
                selected.type === "schedule" &&
                selected.creator === selected.executor
                  ? false
                  : true
              }
            ></textarea>
          </div>
          {/* <p>{selectedText}</p> */}
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={
                selected.type === "schedule" &&
                selected.creator === selected.executor
                  ? false
                  : true
              }
            >
              Save
            </Button>
            {/* <Button variant="contained" color="secondary"
              disabled={selected.creator===selected.executor?false:true}
            >
              Delete
            </Button> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ScheduleDetail;
