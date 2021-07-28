import "../stylesheet/scheduleArea.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import favicon from "../../src/img/favicon.png"

import { MyscheduleButton } from "./ScheduleComponents/MyScheduleButton";
import { useSelector } from "react-redux";
import MyEventCardSchedule from "./PostComponents/MyEventCardSchedule";

const ScehduleRightBarPerosnal = (props) => {
  const scheduleListStore = useSelector((state) => state.scheduleListStore);
  const scheduleList = scheduleListStore.scheduleList;
  
  return (
    <div>
      {(scheduleList && scheduleList.filter((event)=>{
        return new Date(event.start) > new Date() ||
        new Date(event.start) === new Date()
      }).length > 0) ? (

      <center>
        <div
          // className="Schedule-header"
          style={{
            position: "sticky",
            top: "0",
            zIndex: "10",
            backgroundColor: "white",
          }}
        >
          <MyscheduleButton />
          {/* <WeekIcon /> */}
          <hr
            style={{
              height: 5,
            }}
          />
        </div>

        <div>
          {scheduleList.map((event, index) => {
            //console.log('event card',event);
            if (
              
              (new Date(event.start) > new Date() ||
                new Date(event.start) === new Date())
            ) {
              return <MyEventCardSchedule Info={event} key={event.id} />;
            }else{
              return null
            }
          })}
        </div>
      </center>)
      :
      <center style={{overflow:"hidden"}}>
      <div
        // className="Schedule-header"
        style={{
          position: "sticky",
          top: "0",
          zIndex: "10",
          backgroundColor: "white",
          overflow:"hidden"
        }}
      >
        <MyscheduleButton />
        {/* <WeekIcon /> */}
        <hr
          style={{
            height: "5px",
          }}
        />
      </div>
<div style={{height:"90vh",marginLeft:"2%",marginRight:"2%",overflow:"hidden", border:"2px solid grey", backgroundColor:"#96d9ff"}}>
      <div style={{padding:"10px", marginTop:"100%", overflow:"hidden"}}>
          <p>You currently have no events right now!</p>
          <img style={{width:"60%"}} src={favicon} alt="cathead"></img>
        </div>

        </div>



    </center>}
    </div>
  );
};

export default ScehduleRightBarPerosnal;
