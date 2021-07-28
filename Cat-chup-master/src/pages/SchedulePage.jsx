import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "../../src/stylesheet/schedulePage.css";

import ScheduleDetail from "../components/ScheduleComponents/ScheduleDetail";
import {
  TextField,
} from "@material-ui/core";
import ScheduleModal from "../components/ScheduleComponents/ScheduleModal";
import "../stylesheet/scheduleModal.css";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { makeStyles } from "@material-ui/core";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { addNewScheduleSuccessAction } from "../redux/schedule/action";

// const [scheduleList,SetScheduleList] = useState([]);
// useEffect(() => {
//   const scheduleData = [
//     {
//       type:'schedule',

//     }
//   ]
//   // scheduleList = []
//   SetScheduleList(scheduleData);
//   // scheduleList = [{type:'schedule'}]

// }, [])

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


const SchedulePage = (props) => {
  const scheduleListStore = useSelector((state) => state.scheduleListStore);
  const scheduleList = scheduleListStore.scheduleList;
  const [INITIAL_EVENTS, setINITIAL_EVENTS] = useState([]);
  var local_date = moment().format("YYYY-MM-DD");
  var local_hour = moment().format("HH");
  //console.log("local_hour,", local_hour);
  const [modal, setModal] = useState(false);
  const calendarRef = useRef();
  const dispatch = useDispatch();
  const [modalInputTitle, setModalInputTitle] = useState("");
  const [modalScheduleStartTime, setModalScheduleStartTime] = useState(``);
  const [modalScheduleEndTime, setModalScheduleEndTime] = useState(``);
  const [modalContent, setModalContent] = useState("");
  const [nowHour, setNowHour] = useState(`${local_hour}:00`);
  const [modalScheduleDate, setModalScheduleDate] = useState(local_date);
  const [today, setToday] = useState(local_date);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [dataPassed, setDataPassed] = useState(false);
  const [currentEvents, setCurrentEvents] = useState(INITIAL_EVENTS);
  useEffect(() => {
    async function PassEventData() {
      try {
        let currentScheduleList = [];
        if (scheduleList.length) {
          setDataPassed(true);
          //console.log("hihgjhfkfkfkugkgkjgkjgkjgkjgjk", scheduleList);
          scheduleList.map((schedule, index) => {
            // console.log(
            //   "test",new Date(schedule.start)
            // );
            let startTime = new Date(schedule.start);
            let endTime = new Date(schedule.end);
            startTime.setHours(startTime.getHours()+8);
            endTime.setHours(endTime.getHours()+8);
            currentScheduleList.push({
              id: schedule.id,
              title: schedule.content.title,
              start: startTime.toISOString().slice(0,-5),
              end: endTime.toISOString().slice(0,-5),
            });
            return null;
          });
        }
        
         setINITIAL_EVENTS(currentScheduleList);
         //console.log('it rerender',INITIAL_EVENTS)
      } catch (error) {
        console.log("INITIAL_EVENTS DATA error", error);
      }
    }
    PassEventData();
  }, [scheduleList]);
  //console.log(INITIAL_EVENTS);
  // PassEventData();
  // console.log(currentScheduleList);

  // const state = {
  //   modal: false,
  //   caption: "",
  //   Info: { type: "schedule", content: {} },
  //   modalInputTitle: "",
  //   modalInputName2: "",
  //   modalScheduleStartTime: `${local_hour}:00`,
  //   modalScheduleEndTime: `${local_hour}:00`,
  //   modalContent: "",
  //   nowHour: `${local_hour}:00`,
  //   modalScheduleDate: local_date,
  //   today: local_date,
  //   weekendsVisible: true,
  //   currentEvents: [],
  // };

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    if(name==='modalTitle'){
      setModalInputTitle(value);
    }
    if(name==='modalCaption'){
      setModalContent(value);
    }

  };

  const handleSubmit =async (e) => {
    try {
      let token = localStorage.getItem('token');
    let decode = jwtDecode(token);
    let newSchedule = {
      creator:decode.username,
      executor:decode.username,
      start:modalScheduleStartTime,
      end:modalScheduleEndTime,
      type:'schedule'
    }
    let scheduleContent = {
      title:modalInputTitle,
      caption:modalContent
    }
    newSchedule.content = scheduleContent;
    //console.log('submit new schedule',newSchedule);
    let newScheduleReq = await axios({
      url:process.env.REACT_APP_API_SERVER+'/api/schedule',
      headers:{Authorization:`Bearer ${token}`},
      method:'post',
      data:newSchedule
    })
    //console.log('store schedule res',newScheduleReq);
    if(newScheduleReq.status===200){
      dispatch(addNewScheduleSuccessAction(newScheduleReq.data))
      let newStartTime = new Date(modalScheduleStartTime.start);
            let newEndTime = new Date(modalScheduleEndTime.end);
            newStartTime.setHours(newStartTime.getHours()+8);
            newEndTime.setHours(newEndTime.getHours()+8);
      let newEvent = {
        id:newScheduleReq.data.id,
        title:modalInputTitle,
        start:newStartTime,
        end:newEndTime,
      }
      // setINITIAL_EVENTS([...INITIAL_EVENTS,newEvent]);
      //console.log('calendarRef',calendarRef);
      let calendarApi = calendarRef.current.getApi();
      //console.log('calendarapi',calendarApi);
        calendarApi.addEvent(newEvent);

      
    }
    } catch (error) {
      console.log('submit schedule error',error);
    }
    
    //after got new schedule ,dispatch to redux
    modalClose();
    // console.log("close", state);
  };

  const modalOpen = (e) => {
    //console.log('open new schedule modal',e);
    setModal(true);
  };

  const modalClose = () => {
    setModalInputTitle("");
    setModalScheduleStartTime(nowHour);
    setModalScheduleEndTime(nowHour);
    setModalContent("");
    setModalScheduleDate(today);
    setModal(false);
  };


  //   handleWeekendsToggle = () => {
  //     this.setState({
  //       weekendsVisible: !this.state.weekendsVisible,
  //     });
  //   };

  // const handleDateSelect = (selectInfo) => {
  //   let title = prompt("Please enter a new title for your event");
  //   let calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     });
  //   }
  // };

  const handleDisplay = (event) => {
    // console.log("target", document.get);
  };

  const handleEventClick = (clickInfo) => {
    // console.log("clickInfo,", clickInfo.el.classList);
    // console.log("clickInfo,", clickInfo);
    // console.log("clickInfoID,", clickInfo.event["_def"].publicId);
    // console.log(
    //   "schedule_detail_div,",
    //   document
    //     .getElementsByClassName("schedule_detail")[0]
    //     .getElementsByClassName("schedule_detail_box").length
    // );

    const boxes = document
      .getElementsByClassName("schedule_detail")[0]
      .getElementsByClassName("schedule_detail_box");

    for (var box of boxes) {
      // console.log(box);
      box.classList.add("display-none");
    }
    // const postId = document
    //   .getElementsByClassName("schedule_detail")[0]
    //   .getElementsByClassName(`postId${clickInfo.event["_def"].publicId}`);
    // console.log(postId);
    // document
    //   .getElementsByClassName("schedule_detail")[0]
    //   .classList.remove("display-none");
    document
      .getElementsByClassName("schedule_detail")[0]
      .getElementsByClassName(`postId${clickInfo.event["_def"].publicId}`)[0]
      .classList.remove("display-none");

    // return (clickInfo.el.classList = [
    //   ...clickInfo.el.classList,
    //   "display-none",
    // ]);
    // if (
    //   alert(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
    // console.log("event", this.state.Info);
  };

  const handleEvents = (events) => {
    setCurrentEvents({
      currentEvents: events,
    });
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  }

  return (
    <div className="col-9 px-0 mx-0 row">
      <div className="col-9 px-0">
        <div>
          <div
            className="myschedule-header"
            style={{color:"white" ,backgroundColor: "#96d9ff",padding:"20px", marginBottom: "10px" }}
          >
            <span style={{ fontSize: "28px" }}>Schedule</span>
          </div>
          {/* <WeekIcon /> */}
          <div
            className="myschedule-body"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              padding: "0px 0",
              margin: "0px 0",
            }}
          ></div>
          <div className="App">
            <ScheduleModal show={modal} handleClose={(e) => modalClose(e)}>
              <h2>Create a new schedule</h2>
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
                  // value={formik.values.start}
                  // onBlur={formik.handleBlur}
                  value={modalScheduleStartTime}
                  onChange={(e)=>setModalScheduleStartTime(e.target.value)}
                  // onChange={formik.handleChange}
                  required
                />
                <TextField
                  id="end"
                  name="end"
                  label="end time"
                  type="datetime-local"
                  value={modalScheduleEndTime}
                  onChange={(e)=>setModalScheduleEndTime(e.target.value)}
                  // value={formik.values.end}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  
                  required
                />
              </div>
              <div className="form-group">
                <label>Schedule Title:</label>
                <input
                  type="text"
                  name='modalTitle'
                  value={modalInputTitle}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  required
                />
                <br />
                <textarea
                  value={modalContent}
                  name="modalCaption"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  required
                />
              </div>
                <br />
              <div className="form-group">
                <button style={{backgroundColor:"#96d9ff",
                 borderRadius:"2rem",
                  border:"1px solid black",
                  color:"white",
                  fontSize:"25px",
                  padding:"4px 10px 4px 10px"}}
                   onClick={(e) => handleSubmit(e)} type="button">
                  Save
                </button>
              </div>
            </ScheduleModal>
          </div>

          {dataPassed ? (
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              
              selectMirror={true}
              dayMaxEvents={true}
              weekends={weekendsVisible}
              // alternatively, use the `events` setting to fetch from a feed
              events={INITIAL_EVENTS}
              // select={this.handleDateSelect}
              dateClick={(e) => modalOpen(e)}
              // dateClick={function (info) {
              //   alert("clicked " + info.dateStr);
              // }}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              eventsSet={handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
                      eventAdd={function(){}}
                      eventChange={function(){}}
                      eventRemove={function(){}}
                      */
            />
          ) : null}
        </div>
      </div>

      <div className="col-3 px-0 schedule_detail">
        {scheduleList.map((Info) => {
          // console.log(Info);
          return (
            <ScheduleDetail
              className={Info.id}
              Info={Info}
              Id={Info.id}
              scheduleList={Info}
              key={Info.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SchedulePage;
