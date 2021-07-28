import PlanTodayLabel from "./PlanTodayLabel";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import favicon from "../../src/img/favicon.png"

const MyPlansToday = (props) => {
  const scheduleListStore = useSelector((state) => state.scheduleListStore);
  const scheduleList = scheduleListStore.scheduleList;
  const history = useHistory();
  const today = new Date().toLocaleString("en-GB").slice(0, -10);
  const routeChange = () => {
    // let path = "/schedule";
   
    history.push("/schedule");
    
  };

  return (
    <div className="plansTodaySection">
      <p className="myPlansTodayText"> My plans today </p>
      <div
        className="plansTodayContainer"
        onClick={routeChange}
        style={{ cursor: "pointer" }}
      >
        {/* <span placeholder="todays plans">todays plans</span> */}

        {(scheduleList && scheduleList.filter((event)=>{
          return props.username === event.executor &&
          (event.type === "event" || event.type === "schedule") &&
          new Date(event.start).toLocaleString("en-GB").slice(0, -10) ===
            today
        }).length > 0) ? (
        <div
          className="plansTodayBox "
          style={{
            borderRadius: "0.2rem",
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          
          {scheduleList.map((event, index) => {
            if (
              props.username === event.executor &&
              (event.type === "event" || event.type === "schedule") &&
              new Date(event.start).toLocaleString("en-GB").slice(0, -10) ===
                today
            ) {
              return <PlanTodayLabel Info={event} key={event.id} />;
            }
            else{
              return null
            }
          })}
        </div>)
        :  
      <div
        className="plansTodayBox "
        style={{
          borderRadius: "0.2rem",
          overflow: "scroll",
          overflowX: "hidden",
          backgroundColor:"#96d9ff",
        }}>
        <div style={{marginTop:"20%"}}>
          <p>You have no plans today</p>
          <img style={{width:"60%"}} src={favicon} alt="cathead"></img>
        </div>
      </div>
      }

      </div>
    </div>
  );
};

export default MyPlansToday;
